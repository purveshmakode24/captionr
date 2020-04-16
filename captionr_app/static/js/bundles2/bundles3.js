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

function showFeedback() {
    $(".rating input:checked").attr("checked", !1);
    $("#feedbackRequested").show();
    $("#feedbackReceived").hide();
    $("#feedback").show();
    $("#tryAnother").show()
}

function onFeedback(n) {
    $.ajax({
        url: apiEndpoint + "/api/messages",
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            Type: "Feedback",
            Content: n
        }),
        success: function() {},
        error: onError
    });
    $("#feedbackRequested").hide();
    $("#feedbackReceived").show();
    $("#tryAnother").show()
}

function onError() {
    $("#captionLabel").text(localizedStrings.UNDER_WEATHER);
    $("#tryAnother").show()
}

function showCaptionResult(n) {
    n.indexOf("inappropriate") >= 0 && $("#thumbContainer").html("");
    $("#captionLabel").text(n);
    showFeedback()
}

function sendCaptionRequest(n) {
    var t = $("#language-select").val();
    $("#captionLabel").text(localizedStrings.ANALYZING);
    $.ajax({
        url: apiEndpoint + "/api/messages?language=" + t,
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            Type: "CaptionRequest",
            Content: n
        }),
        success: function(n) {
            showCaptionResult(n)
        },
        error: onError
    })
}

function onUrlSubmit() {
    var n = $("#idTextField").val();
    n.trim() !== "" && ($("#idTextField").val(""), updateThumbnail(n), showResultPending(), sendCaptionRequest(n))
}

function updateThumbnail(n, t) {
    $("#thumbnail").remove();
    n && n !== "" || (n = "images/placeholder.png");
    loadImage(n, function(n) {
        if (n.type === "error") $("#thumbContainer").prepend('<img id="thumbnail" src="{% static `images/placeholder.png` %}" class="img-responsive center-block" />');
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
    $.ajax({
        url: "/api/upload",
        type: "post",
        data: t,
        contentType: !1,
        processData: !1,
        success: function(n) {
            sendCaptionRequest(n)
        },
        error: onError
    })
}

function dataURLToBlob(n) {
    var f = ";base64,",
        i;
    if (n.indexOf(f) == -1) {
        var t = n.split(","),
            u = t[0].split(":")[1],
            r = t[1];
        return new Blob([r], {
            type: u
        })
    }
    var t = n.split(f),
        u = t[0].split(":")[1],
        r = window.atob(t[1]),
        e = r.length,
        o = new Uint8Array(e);
    for (i = 0; i < e; ++i) o[i] = r.charCodeAt(i);
    return new Blob([o], {
        type: u
    })
}

function scaleImage(n, t) {
    var i = 1200,
        r = new Image;
    r.onload = function() {
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
        } i != null && ($("#captionLabel").text(localizedStrings.OPTIMIZING), showResultPending(), updateThumbnail("/images/placeholder.png"), u = new FileReader, u.onload = function(n) {
        return function(t) {
            loadImage.parseMetaData(n, function(r) {
                var u = null;
                r && r.exif && (u = r.exif.get("Orientation"));
                n.size > FileSizeLimit ? scaleImage(t.target.result, function(n, t) {
                    updateThumbnail(n, u);
                    uploadImage(t)
                }) : (updateThumbnail(t.target.result, u), uploadImage(i))
            })
        }
    }(i), u.readAsDataURL(i))
}
var FileSizeLimit = 4e6,
    apiEndpoint = document.getElementById("api-endpoint").value;
$(document).ready(function() {
    $("#idTextSubmitButton").click(onUrlSubmit);
    $("#idTextField").keypress(function(n) {
        if (n.which === 13) return onUrlSubmit(), !1
    });
    $("#samplePhotoSelect").click(function() {
        var n = $(".selectedImage")[0],
            t, i, r, u;
        // n && (t = $(n).attr("data-action"), t === "upload" ? $("#idImageUploadField").click() : (i = "https://www.captionbot.ai/images/" + $(n).attr("data-url"), showResultPending(), r = n.currentStyle || window.getComputedStyle(n, !1), u = r.backgroundImage.slice(4, -1).replace(/"/g, ""), updateThumbnail(u, null), sendCaptionRequest(i)))
         n && (t = $(n).attr("data-action"), t === "upload" ? $("#idImageUploadField").click() : (i = "https://???????????????????/images/" + $(n).attr("data-url"), showResultPending(), r = n.currentStyle || window.getComputedStyle(n, !1), u = r.backgroundImage.slice(4, -1).replace(/"/g, ""), updateThumbnail(u, null), sendCaptionRequest(i)))
    });
    $("#SelectorBox").on("tap", function() {
        $("#samplePhotoSelect").click()
    });
    $("#idImageUploadField").change(onImageUpload);
    $("#tryAnother").click(function() {
        showImagePicker()
    });
    $(".rating").change(function(n) {
        var t = $(n.target).attr("value");
        onFeedback(t)
    });
    showImagePicker()
})