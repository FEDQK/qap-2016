/**
 * Created by Admin on 05.04.2016.
 */
var main1 = document.getElementById('main1');
var main2 = document.getElementById('main2');
var foot = document.getElementsByTagName("footer");
var list = document.getElementById("list");
var count = 0, contentblock, toggleButtonElement;


window.onload = function(){
    var hammertime1 = Hammer(main1).on("swipeleft", function(event) {
        foot[0].getElementsByTagName("div")[0].style.background = "#cccccc";
        foot[0].getElementsByTagName("div")[1].style.background = "#00b9e6";
        main1.style.animation = "swipel 1s both ease"
    });
    var hammertime2 = Hammer(main2).on("swiperight", function(event) {
        foot[0].getElementsByTagName("div")[1].style.background = "#cccccc";
        foot[0].getElementsByTagName("div")[0].style.background = "#00b9e6";
        main1.style.animation = "swiper 1s both ease"
    });
    function updateCount(event) {
        count = list.childElementCount;
        if(event.type === 'DOMNodeRemoved') count--;
        document.getElementById('txtlinks').firstChild.innerText = count;
    }
    list.addEventListener('DOMNodeInserted',updateCount);
    list.addEventListener('DOMNodeRemoved',updateCount);
    function toggleButton() {
        if(checkInputs(contentblock) && toggleButtonElement.classList.contains('add'))
        {
            toggleButtonElement.classList.remove('add');
            toggleButtonElement.classList.add('remove');
            toggleButtonElement.innerText = "REMOVE ALL";
        }
        else if(!checkInputs(contentblock) && toggleButtonElement.classList.contains('remove'))
        {
            toggleButtonElement.classList.remove('remove');
            toggleButtonElement.classList.add('add');
            toggleButtonElement.innerText = "ADD ALL";
        }
    }
    main1.addEventListener('click', function (event) {
        if(event.target.id === 'main1') return;
        var tagname = event.target.tagName.toLowerCase(),
            element,
            inputs;
        contentblock = event.target;
        while (!contentblock.classList.contains('block'))
        {
            contentblock = contentblock.parentNode;
        }
        inputs = contentblock.getElementsByTagName('input');
        toggleButtonElement = contentblock.getElementsByClassName('toggleAll')[0];
        if(tagname === 'button')
        {
            if(event.target.classList.contains('add'))
            {
                checkAll(inputs);
            }
            else if(event.target.classList.contains('remove'))
            {
                removeAll(inputs);
            }
        }else
        {
            if(tagname === 'label')
            {
                element = event.target.cloneNode(true);
                if(event.target.previousSibling.checked) removeLI(element);
                else addLI(element);
            }
        }
        toggleButton(toggleButtonElement);

    });
    main2.addEventListener('click', function (event) {
        var tagname = event.target.tagName.toLowerCase(),
            inputsform = main2.getElementsByTagName('input'),
            inputs = main1.getElementsByTagName('input'),
            form = main2.getElementsByTagName('form'),
            buttons = document.getElementsByClassName('toggleAll'),
            txtform = '';
        if(tagname === 'button')
        {
            for(var i = 0; i < inputsform.length; i++)
            {
                txtform = txtform + inputsform[i].name + " = " + inputsform[i].value + '\n';
            }
            alert(txtform);
            form[0].reset();
            list.innerHTML = '';
            for(var j = 0; j < inputs.length; j++)
            {
                inputs[j].checked = false;
            }
            for(var k = 0; k < buttons.length; k++)
            {
                if(buttons[k].classList.contains('remove'))
                {
                    buttons[k].classList.remove('remove');
                    buttons[k].classList.add('add');
                    buttons[k].innerText = "ADD ALL";
                }
            }
            document.getElementById('txtlinks').firstChild.innerText = '0';
        }
    });

    function addLI(element) {
        var li = document.createElement('li');
        li.classList.add(element.className);
        li.setAttribute('data-id', element.getAttribute('for'));
        li.innerHTML = element.innerText;
        var basket = document.createElement('div');
        basket.classList.add('delbasket');
        basket.addEventListener('click', delBasket);
        li.appendChild(basket);
        list.appendChild(li);

    }
    function removeLI(element) {
        var li = document.querySelector('#main2 [data-id='+ element.getAttribute('for') + ']');
        list.removeChild(li);
    }
    function checkInputs(content) {
        return !content.querySelector('input:not(:checked)');
    }
    function checkAll(inputs) {
        for(var i = 0; i < inputs.length; i++)
        {
            if(!inputs[i].checked)
            {
                inputs[i].checked = true;
                addLI(inputs[i].nextElementSibling);
            }
        }
    }
    function removeAll(inputs) {
        for(var i = 0; i < inputs.length; i++) 
        {
            if (inputs[i].checked) 
            {
                inputs[i].checked = false;
                removeLI(inputs[i].nextElementSibling);
            }
        }
    }

    function delBasket() {
        var id = this.parentNode.getAttribute('data-id');
        document.querySelector('[for = ' + id +']').previousElementSibling.checked = false;
        list.removeChild(this.parentNode);
        toggleButton(toggleButtonElement);
    }

};