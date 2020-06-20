// preloader start
function myFunction() {
    let preloader = document.getElementById('loading');
    setTimeout(function () {
        preloader.style.display = 'none';
    }, 1000);
}
// preloader end

// smooth    resize start
function makeResizable(element) {
    if (element && jQuery(element).length) {
        var $elementscale = jQuery(element);
        var elHeight = $elementscale.outerHeight();

        var $wrapper = $elementscale.parent();

        var starterData = {
            size: {
                width: $wrapper.width(),
                height: $wrapper.height()
            }
        }
        var scale = Math.min(
            starterData.size.width / $elementscale.outerWidth(),
            starterData.size.height / $elementscale.outerHeight()
        );
        if (scale > 1) {
            scale = 1;
        }
        var elMarginBottom = (scale * elHeight) - starterData.size.height;
        $elementscale.css({
            transform: "translate3d(-50%, 0, 0) " + "scale(" + scale + ")",
            'margin-bottom': elMarginBottom,
            'transition': 'all 0.7s'
        });
    }
}
jQuery(document).ready(function () {
    makeResizable('#very-specific-design');
});
jQuery(window).resize(function () {
    makeResizable('#very-specific-design');
});
// smooth resize end


// solutuion start
let imageRight = document.createElement("img");
imageRight.classList.add("float-right", "mr-3", "mt-3");
imageRight.style.width = "30px";
imageRight.src = "http://educationalrc.org/tasks/4/assets/images/tikMark-small.png";

let imageFalse = document.createElement("img");
imageFalse.classList.add("float-right", "mr-3", "mt-2");
imageFalse.style.width = "30px";
imageFalse.src = "https://cdn2.iconfinder.com/data/icons/user-needs-19/16/45_false_delete_remove_cross_wrong-512.png";

let array = ['eraser', 'ruler', 'pencil', 'book', 'pen'];
let answerPlace = $('.option');
let correctAnswers = 0;
let canClick = false;
let answerAfterClick = "";
let correctSound = document.getElementById("correct-audio");
let inCorrectSound = document.getElementById("incorrect-audio");

// button for show answer start
$("#show-answer").click(function () {
    correctAnswers = 5;
    this.classList.add("disabled");

    for (let i = 0; i < answerPlace.length; i++) {
        answerPlace[i].innerHTML = array[i];
        answerPlace[i].appendChild(imageRight.cloneNode(true));

        answerPlace[i].classList.add("disabled");
        for (let j = 0; j < $('.question').length; j++) {
            $('.question')[j].classList.remove("selected");
            $('.question')[i].setAttribute("draggable", "false");
            if ($('.question')[j].innerHTML === array[i]) {
                $('.question')[j].style.visibility = "hidden";
            }
            else {
                $('.question')[j].classList.add("disabled");
                $('.question')[j].style.color = "rgb(134, 134, 134)";
            }
        }

    }

});
// button for show answer end

// button for reset answer start
$('#clear-answer').click(function () {
    correctAnswers = 0;
    if ($("#show-answer")[0].classList.contains("disabled")) {
        $("#show-answer")[0].classList.remove("disabled");
    }
    for (let i = 0; i < answerPlace.length; i++) {
        if (answerPlace[i].innerHTML !== "") {
            answerPlace[i].innerHTML = ""
        }
    }
    for (let i = 0; i < $('.question').length; i++) {
        if ($('.question')[i].classList.contains("disabled") || $('.question')[i].style.visibility == "hidden") {
            $('.question')[i].classList.remove("disabled", "selected");
            $('.question')[i].removeAttribute("style");
            $('.question')[i].setAttribute("draggable", "true");


        }
    }
})
// button for reset answer end

// click and put answer start

$('.question').click(function () {
    if (correctAnswers != 5) {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            canClick = false;
            answerAfterClick = "";
        }
        else {
            $(this).addClass('selected').siblings().removeClass('selected');
            canClick = true
            answerAfterClick = $(this)[0].innerHTML;
        }
    }
})

answerPlace.click(function () {
    if (canClick) {
        if (array.indexOf(answerAfterClick) != -1 && $(this)[0].innerHTML == "") {
            $(this)[0].innerHTML = answerAfterClick;
            $(this)[0].appendChild(imageRight.cloneNode(true));
            foundCorrectWord(answerAfterClick);
            canClick = false;

        }
        if (array.indexOf(answerAfterClick) == -1 && $(this)[0].innerHTML == "") {

            $(this)[0].innerHTML = answerAfterClick;
            $(this)[0].appendChild(imageFalse);
            inCorrectSound.play();
            var span = $(this)[0];

            setTimeout(function () {
                span.innerHTML = "";
                canClick = false;
                $(".question").removeClass("selected");
            }, 1000);
        }

        if (correctAnswers == 5) {
            answerCompleted();
        }

    }
})

// click and put answer end

// drag and drop start
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    $(".question").removeClass("selected");
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (array.indexOf(data) != -1 && ev.target.innerHTML == "") {
        ev.target.innerHTML = data;
        ev.target.appendChild(imageRight.cloneNode(true));
        foundCorrectWord(data);
    }
    if (array.indexOf(data) == -1 && ev.target.innerHTML == "") {
        setTimeout(function () {
            ev.target.innerHTML = "";
        }, 1000);
        ev.target.innerHTML = data;
        ev.target.appendChild(imageFalse);
        inCorrectSound.play();
    }
    if (correctAnswers == 5) {
        answerCompleted();
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}
// drag and drop end

// this fn called when you completed all answers
function answerCompleted() {
    for (let j = 0; j < $('.question').length; j++) {
        $('.question')[j].setAttribute("draggable", "false");
        $('.question')[j].classList.add("disabled");
        $('.question')[j].style.color = "rgb(134, 134, 134)";
    }
}

// this fn called every time you found right word
function foundCorrectWord(elementId) {
    document.getElementById(elementId).style.visibility = "hidden";
    correctSound.play();
    correctAnswers++;
}

// solution end

