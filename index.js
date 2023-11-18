/* THEME BUTTON */

let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

/* SIGN NOW BUTTON */

//adds query for the sign now button here
let signNowButton = document.getElementById('sign-now-button');

const addSignature = () => {
  const name = document.getElementById('name').value;
  const hometown = document.getElementById('hometown').value;

  const newSignature = document.createElement('p');
  newSignature.textContent = (`\n\n ${name} from ${hometown} supports this.`)
  let signatures = document.getElementById('signatures');
  signatures.appendChild(newSignature);

  let currCounter = document.getElementById('counter');
  currCounter.remove() ///removes counter already present

  //increments total number of signatures
  count += 1;

  //creates a new counter HTML p tag and set id to counter
  let newCounter = document.createElement('p');
  newCounter.id = 'counter';
  newCounter.textContent = (`🖊️ ${count} people have signed this petition and support this cause.`);
  signatures.appendChild(newCounter);
}

//keeps track of the starting number of signatures
let count = 3; 

const validateForm = () => {
  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0],
    hometown: petitionInputs[1],
    email: petitionInputs[2]
  }

  /*//checks if name, hometown, and email suffice length requirements
  if (person.name.length < 2) {
    containsErrors = true;
    person.name.classList.add('error');
  }
  
  if (person.hometown.length < 2) {
    containsErrors = true;
    person.hometown.classList.add('error');
  }

  if (person.email.length < 2) {
    containsErrors = true;
    person.email.classList.add('error');
  }

  //validates email
  const email = document.getElementById('email');
  if (!email.value.includes('.com')) { //email address doesn't contain '.com'
    //email address is INVALID
    containsErrors = true;
    email.classList.add('error');
  } else { //email address satisfies 'com' requirement
    email.classList.remove('error');
  }*/
  
  //loops through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) { //user input is too short and therefore invalid
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    } else { //user input was valid
      //validates email
      const email = document.getElementById('email');
      if (!email.value.includes('.com')) { //email address doesn't contain '.com'
        //email address is INVALID
        containsErrors = true;
        email.classList.add('error');
      } else { //email address satisfies 'com' requirement
        email.classList.remove('error');
      }
    }
  }

  //validates the value of each input
  //calls addSignature() and clear fields if no errors
  if (!containsErrors) {
    addSignature();
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }

}

signNowButton.addEventListener('click', validateForm);

/* REVEALABLE CLASS PROPERTIES */

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll(".revealable");
const reveal = () =>  {
  // checks each revealableContainer to see if it's in the right position to be revealed
  for (let i=0; i<revealableContainers.length; i++) {
    let windowHeight = window.innerHeight; //height of window
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top; //top of the revealable container
    //checks if topOfRevealableContainer should be loaded in
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add('active');
    } else {
      /* remove the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

/* REDUCE MOTION BUTTONS */

let reduceMotionButton = document.getElementById("reduce-motion");

const reduceMotion = () => {
  for (let i=0; i<revealableContainers.length; i++) {
    revealableContainers[i].style.transition = "none"
  }
}

reduceMotionButton.addEventListener('click', reduceMotion)

let scaleFactor = 1;
let modalImage = document.getElementById("modalImage");
const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
}

let modal = document.getElementById('thanks-modal');
let modalContent = document.getElementById('thanks-modal-content');

const toggleModal = (person) => {
  modal.style.display = "flex";
  modalContent.textContent = "Thank you so much " + person.name.value + "! " + person.hometown.value + " represent!";

  let intervalId = setInterval(scaleImage, 500);
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
  
}

/* BUTTON */
let modalButton = document.getElementById('modal-button');

const setMdodalButton = () => {
  modal.style.display = "none";
}

modalButton.addEventListener('click', setMdodalButton)