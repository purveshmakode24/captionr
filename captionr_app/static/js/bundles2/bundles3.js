function showResultPending() {
    $("#thumbContainer").show();
    $("#imagePicker").hide();
    $(".footer").removeClass("footerTranslate")
}

function showImagePicker() {
    $("#captionLabel").html($("#captionLabelDefault").val());
    $("#thumbContainer").hide();
    $("#tryAnother").hide();
    $("#feedback").hide();
    ImageSelector.refresh();
    $(".footer").addClass("footerTranslate")
}



function uploadImageSuccess() {
    $("#captionLabel").text(localizedStrings.IMAGE_UPLOADED_PRESS_TO_ANALYZE);
    $("#tryAnother").show()
}



// function sendCaptionRequest(n) {
// var t = $("#language-select").val();
// $("#captionLabel").text(localizedStrings.ANALYZING);
//     $.ajax({

//         success: function (n) {
//             showCaptionResult(n)
//         },
//         error: onError
//     })
// }


function updateThumbnail(n, t) {
    $("#thumbnail").remove();
    n && n !== "" || (n = "images/placeholder.png");
    loadImage(n, function (n) {
        // if (n.type === "error") $("#thumbContainer").prepend('<img id="thumbnail" src="{% static `images/placeholder.png` %}" class="img-responsive center-block" />');
        if (n.type === "error") $("#thumbContainer");
        else {
            var t = $(n);
            t.attr("id", "thumbnail");
            t.addClass("img-responsive center-block");
            $("#thumbContainer").prepend(t)
        }
    }, {
        canvas: !0,
        orientation: t
    })
}


function uploadImage(n) {
    $("#captionLabel").text(localizedStrings.UPLOADING);
    var t = new FormData;
    t.append("file", n);

    setTimeout(function () {
        $.ajax({
            // success: function (n) {
            //     sendCaptionRequest(n)
            // },
            success: uploadImageSuccess()
        })
    }, 1000)

}


function scaleImage(n, t) {
    var i = 1200,
        r = new Image;
    r.onload = function () {
        var f = document.createElement("canvas"),
            n = r.width,
            u = r.height,
            e, o;
        n > u ? n > i && (u *= i / n, n = i) : u > i && (n *= i / u, u = i);
        f.width = n;
        f.height = u;
        f.getContext("2d").drawImage(r, 0, 0, n, u);
        e = f.toDataURL("image/jpeg");
        o = dataURLToBlob(e);
        t && t(e, o)
    };
    r.src = n
}

function onImageUpload(n) {
    for (var r = n.target.files, i = null, u, t = 0; t < r.length; t++)
        if (!r[t].type || r[t].type.match("image.*")) {
            i = r[t];
            break
        } i != null && ($("#captionLabel").text(localizedStrings.OPTIMIZING), showResultPending(), u = new FileReader, u.onload = function (n) {
            return function (t) {
                loadImage.parseMetaData(n, function (r) {
                    var u = null;
                    r && r.exif && (u = r.exif.get("Orientation"));
                    n.size > FileSizeLimit ? scaleImage(t.target.result, function (n, t) {
                        updateThumbnail(n, u);
                        uploadImage(t)
                    }) : (updateThumbnail(t.target.result, u), uploadImage(i))
                })
            }
        }(i), u.readAsDataURL(i))
}


var FileSizeLimit = 4e6,
    // apiEndpoint = document.getElementById("api-endpoint").value;
    apiEndpoint = document.getElementById("doc-startpoint");
$(document).ready(function () {

    $("#samplePhotoSelect").click(function () {
        var n = $(".selectedImage")[0],
            t, i, r, u;
        n && (t = $(n).attr("data-action"), t === "upload" ? $("#idImageUploadField").click() : (showResultPending(), r = n.currentStyle || window.getComputedStyle(n, !1), u = r.backgroundImage.slice(4, -1).replace(/"/g, ""), updateThumbnail(u, null)))
    });
    $("#SelectorBox").on("tap", function () {
        $("#samplePhotoSelect").click()
    });
    $("#idImageUploadField").change(onImageUpload);
    $("#tryAnother").click(function () {
        showImagePicker()
    });

    showImagePicker()
})