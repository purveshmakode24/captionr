# captionr

- Smart AI bot to generate captions from images.

> Directory tree structure  
  
    ├── ...
    ├── media                  
    │   ├── your model          # Required 
    │   └── tokenizer.pkl       # Required
    │               
    ├── ... 
    └── README.md

## Objective
- To develop a framework which uses the abilities of neural networks to generate a
caption for an image based on its features. Recurrent Neural Network (RNN) and CNN
are used as a part of the encoder-decoder framework for the process of machine
translation.
- To use Convolutional Neural Network (CNN) in the encoder part, instead of RNN.
Thus, image is transformed into required form of input data to feed into the decoder
consisting of the RNN.
- To transform the image into a multi-feature vector, characterizing its features. Flicker
8k dataset would be used for the same.
- To generate captions using Greedy and Beam Search decoding.
- Use text to speech API to convert generated caption to text.

## Our Model and Tokenizer (links to download):

[Model](https://drive.google.com/file/d/1zucHy25zZPEFl5L6zrcr62_WYuS-jyxa/view?usp=sharing) <br/>
[tokenizer.pkl](https://drive.google.com/file/d/1T5AnfKaO-AvsFHwnHfVyHa4vjF7MX8Z2/view?usp=sharing)

## Others - Link to Project Related Files

https://drive.google.com/drive/folders/16Mz7anvxs6J35farNKp4pnN4-X1JO8Lf

## Contribution

If you're new to contributing to Open Source on Github, please check out [this contribution guide](https://guides.github.com/activities/contributing-to-open-source/) for more details on how issues and pull requests work.
