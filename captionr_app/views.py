from django.shortcuts import render, redirect
from .forms import ImageForm
from .models import  Caption_Predictor


#RELATED TO MODEL PREDICTION
import time
from pickle import load
from numpy import argmax
from keras.preprocessing.sequence import pad_sequences
from keras.applications.vgg16 import VGG16
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.models import Model
from keras.models import load_model
from django.conf import settings
import os
from gtts import gTTS 
from math import ceil

import numpy as np
from numpy import array
import pandas as pd
#import matplotlib.pyplot as plt
import string
import os
from PIL import Image
import glob
from pickle import dump, load

import time
from keras.preprocessing import sequence
from keras.models import Sequential
from keras.layers import LSTM, Embedding, TimeDistributed, Dense, RepeatVector, \
	Activation, Flatten, Reshape, concatenate, Dropout, BatchNormalization
from keras.optimizers import Adam, RMSprop
from keras.layers.wrappers import Bidirectional
from keras.layers.merge import add
from keras.applications.inception_v3 import InceptionV3
from keras.preprocessing import image
from keras.models import Model
from keras import Input, layers
from keras import optimizers
from keras.applications.inception_v3 import preprocess_input
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
from keras import backend as K


def extract_features(image_path):
	model = InceptionV3(weights='imagenet')
	# re-structure the model
	model.layers.pop()
	model = Model(inputs=model.inputs, outputs=model.layers[-1].output)
	# Convert all the images to size 299x299 as expected by the inception v3 model
	img = image.load_img(image_path, target_size=(299, 299))

	x = image.img_to_array(img)
	# Add one more dimension
	# print("type1 = " , x.shape )
	x = np.expand_dims(x, axis=0)
	# print("type2 = " , x.shape )
	x = preprocess_input(x)
	v = model.predict(x)
	# print("type3 = " , v.shape )
	# v = np.reshape(v, v.shape[1])
	return v


# map an integer to a word
def word_for_id(integer, tokenizer):
	for word, index in tokenizer.word_index.items():
		if index == integer:
			return word
	return None


# generate a description for an image
def generate_desc(model, tokenizer, photo, max_length):
	# seed the generation process
	in_text = 'startseq'
	# iterate over the whole length of the sequence
	for i in range(max_length):
		# integer encode input sequence
		sequence = tokenizer.texts_to_sequences([in_text])[0]
		# pad input
		sequence = pad_sequences([sequence], maxlen=max_length)
		# predict next word
		yhat = model.predict([photo, sequence], verbose=0)
		# convert probability to integer
		yhat = argmax(yhat)
		# map integer to word
		word = word_for_id(yhat, tokenizer)
		# stop if we cannot map the word
		if word is None:
			break
		# append as input for generating the next word
		in_text += ' ' + word
		# stop if we predict the end of the sequence
		if word == 'endseq':
			break
	in_text = in_text.replace('startseq','')
	in_text = in_text.replace('endseq','')
	return in_text









def int_to_word(integer, tokenizer):
	for word, index in tokenizer.word_index.items():
		if index == integer:
			return word
	return None


def generate_caption_beam_search(model, tokenizer, image, max_length, beam_index):
	# in_text --> [[idx,prob]] ;prob=0 initially
	in_text = [[tokenizer.texts_to_sequences(['startseq'])[0], 0.0]]
	while len(in_text[0][0]) < max_length:
		tempList = []
		for seq in in_text:
			padded_seq = pad_sequences([seq[0]], maxlen=max_length)
			preds = model.predict([image, padded_seq], verbose=0)
			# Take top (i.e. which have highest probailities) `beam_index` predictions
			top_preds = np.argsort(preds[0])[-beam_index:]
			# Getting the top `beam_index` predictions and
			for word in top_preds:
				next_seq, prob = seq[0][:], seq[1]
				next_seq.append(word)
				# Update probability
				prob += preds[0][word]
				# Append as input for generating the next word
				tempList.append([next_seq, prob])
		in_text = tempList
		# Sorting according to the probabilities
		in_text = sorted(in_text, reverse=False, key=lambda l: l[1])
		# Take the top words
		in_text = in_text[-beam_index:]
	in_text = in_text[-1][0]
	final_caption_raw = [int_to_word(i, tokenizer) for i in in_text]
	final_caption = []
	for word in final_caption_raw:
		if word == 'endseq':
			break
		else:
			final_caption.append(word)
	final_caption.append('endseq')
	final_caption = ' '.join(final_caption)
	final_caption = final_caption.replace('startseq','')
	final_caption = final_caption.replace('endseq','')
	return final_caption

#RELATED TO MODEL PREDICTION ENDS










# views

def home(request):
	return render(request, 'index.html', {})


def image_view(request):
	if request.method == 'POST':
		form = ImageForm(request.POST, request.FILES)

					
		if form.is_valid():
			form.save()
			obj =Caption_Predictor.objects.latest('id')
			print("hello" , obj.img )
			print("this " , obj.img.url)
			base_dir = settings.MEDIA_ROOT
			#my_file = os.path.join(base_dir, str(GDRAT.xls))

			#code related to model processing

			start = time.time()




			# load the tokenizer

			tokenizer = load(open( os.path.join( base_dir , 'tokenizer.pkl' ), 'rb'))
			# pre-define the max sequence length (from training)
			max_length = 34
			# load the model
			K.clear_session()
			model = load_model( os.path.join( base_dir , 'model-ep004-loss3.418-val_loss3.717.h5' ) )
			# load and prepare the photograph
			photo = extract_features( os.path.join( base_dir ,str(obj.img ) ) )
			# generate description
			greedy_description = generate_desc(model, tokenizer, photo, max_length)
			beam_search3 = generate_caption_beam_search(model, tokenizer, photo,max_length,3)
			beam_search5 =generate_caption_beam_search(model, tokenizer, photo,max_length,5)
			beam_search7 = generate_caption_beam_search(model, tokenizer, photo,max_length,7)
			
			K.clear_session()

			mytext = greedy_description
  
			# Language in which you want to convert 
			language = 'en'
  
			# Passing the text and language to the engine,  
			# here we have marked slow=False. Which tells  
			# the module that the converted audio should  
			# have a high speed 
			myobj = gTTS(text=mytext, lang=language, slow=True) 
  
			# Saving the converted audio in a mp3 file named 
			# welcome  
			myobj.save( "media/latest.mp3") 

			end = time.time()
			ttime = int( end - start) + 1
			print("Time taken to predict is ", end - start, " seconds ")

			# return render(request, 'index.html', {'form': form , 'message':description})
			return render(request, 'prediction.html', {'form:':form, 'greedy_description':greedy_description,'beam_search3':beam_search3,'beam_search5':beam_search5,'beam_search7':beam_search7, 'obj':obj,'ttime':ttime})

		
	else:
		form = ImageForm()
		# return redirect('home')
		
	return render(request, 'index.html', {'form': form})
