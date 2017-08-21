var biographyElement = null;  // variable to hold clicked person element

writeDataArrayToDom();
addListenersToPersonElements();
addListnerToInputField();


////////////////////
//  FUNCTIONs ()  //
////////////////////


function writeDataArrayToDom() {
// Loop to create person node and internal elements.  
// Data array held in wysiwyg_data.js
  for (var i = 0; i < famousArray.length; i++) {
    var personNode = document.createElement('person');
    personNode.setAttribute('id', `${famousArray[i].title}`);
    personNode.setAttribute('class', 'famous');

    var headerNode = document.createElement("header");
    headerNode.innerHTML = famousArray[i].name;

    var imgNode = document.createElement("img");
    imgNode.setAttribute('src',`${famousArray[i].image}`);

    var sectionNode = document.createElement("section");
    sectionNode.setAttribute('class', 'bio');
    sectionNode.innerHTML = famousArray[i].bio;

    var footerNode = document.createElement("footer");

    var lifeDates = '<p>Birth: ' + famousArray[i].lifespan.birth + ', Death: ' + famousArray[i].lifespan.death + '</p>';

    footerNode.innerHTML = lifeDates;
    personNode.appendChild(headerNode);
    personNode.appendChild(imgNode);
    personNode.appendChild(sectionNode);
    personNode.appendChild(footerNode);

    writeToDom(personNode)
  }
}


function writeToDom(stuffToWrite) {
  document.getElementById('container').appendChild(stuffToWrite);
}


function addListenersToPersonElements() {
// Add event listeners to person elements for clicks
//   and focus the input text field for biography entry.
// Set the biographyElement to the section element for 'clicked' person element.

  var personArray = document.getElementsByClassName('famous');

  for (var i = 0; i < personArray.length; i++) {
    personArray[i].addEventListener('click', function(){
      if (document.getElementsByClassName('dotted').length > 0) {
        document.getElementsByClassName('dotted')[0].classList.remove('dotted');
      }
      this.className += ' dotted';
      biographyElement = this.getElementsByTagName('section');
      document.getElementById('inputField').focus();
    });
  }
}

function addListnerToInputField() {
// Add event listener to input field.
// Clear the input field if 'enter' key pressed.
// Remove the dotted border from person element after enter key pressed.
// Blur the input field after enter key pressed.
  document.getElementById('inputField').addEventListener('keydown', function(e) {
      if (e.keyCode===13 && document.getElementsByClassName('dotted').length !== 0) {
        this.value = '';
        document.getElementsByClassName('dotted')[0].classList.remove('dotted');
        document.getElementById('inputField').blur();
      }
      else if (document.getElementsByClassName('dotted').length > 0) {
        biographyElement[0].innerHTML = '<p>' + this.value; + '</p>';
      } 
      else if (e.keyCode===13) {
        document.getElementById('inputField').blur();
        document.getElementById('inputField').value = '';
      }
  });
}
