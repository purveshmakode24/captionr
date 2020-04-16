"use strict";
var ImageSelector = {
    selectedImage: null,
    myScroll: null,
    initialize: function() {
        var n;
        document.getElementById("SelectorTag").addEventListener("mousedown", function(n) {
            n.cancelBubble = !0
        }, !1);
        var i = this,
            t = $(".ImageSelector .ScrollArea *"),
            r = parseInt(t.css("margin-left").replace("px", "")) || 0,
            u = parseInt(t.css("margin-right").replace("px", "")) || 0,
            f = t[0].offsetWidth,
            e = (f + r + u) * t.length;
        $(".ImageSelector .ScrollArea").css("width", e + "px");
        n = this.myScroll = new IScroll(".ImageSelector", {
            scrollX: !0,
            scrollY: !1,
            mouseWheel: !0,
            snap: "*",
            momentum: !0,
            tap: !0,
            deceleration: .002,
            bounce: !1
        });
        n.goToPage((t.length / 2).toFixed(0) - 1, 0, 0, !1);
        $(".ImageSelector .ScrollArea *").on("tap", function() {
            n.currentPage.pageX != $(this).index() && ($(".ImageSelector .ScrollArea .selectedImage").removeClass("selectedImage"), n.goToPage($(this).index(), 0, 400))
        });
        $(".ImageSelector").css("opacity", 1);
        this.updateSelectedImage();
        n.on("flick", function() {
            this.x == this.startX && i.updateSelectedImage()
        });
        n.on("scrollEnd", $.proxy(this.updateSelectedImage, this));
        n.on("scrollStart", function() {
            $(".ImageSelector .ScrollArea .selectedImage").removeClass("selectedImage")
        })
    },
    updateSelectedImage: function() {
        this.selectedImage = $(".ImageSelector .ScrollArea *")[this.myScroll.currentPage.pageX];
        this.selectedImage && ($(this.selectedImage).addClass("selectedImage"), $(this.selectedImage).attr("data-action") === "upload" ? $("#samplePhotoSelect .text").text(localizedStrings.UPLOAD) : $("#samplePhotoSelect .text").text(localizedStrings.USE_THIS))
    },
    refresh: function() {
        var n;
        $("#imagePicker").show();
        n = this.myScroll;
        n.options.snap = n.scroller.querySelectorAll("*");
        $(".ImageSelector .ScrollArea *").removeClass("selectedImage").on("tap", function() {
            n.currentPage.pageX !== $(this).index() && ($(".ImageSelector .ScrollArea .selectedImage").removeClass("selectedImage"), n.goToPage($(this).index(), 0, 400))
        });
        var t = $(".ImageSelector .ScrollArea *"),
            i = parseInt(t.css("margin-left").replace("px", "")) || 0,
            r = parseInt(t.css("margin-right").replace("px", "")) || 0,
            u = t[0].offsetWidth,
            f = (u + i + r) * t.length;
        $(".ImageSelector .ScrollArea").css("width", f + "px");
        n.refresh();
        n.goToPage((t.length / 2).toFixed(0) - 1, 0, 0, !1);
        this.updateSelectedImage()
    }
};
$(function() {
    ImageSelector.initialize()
})