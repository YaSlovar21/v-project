import './tw.css';
import './index.css';


import '../images/favicon.svg';

const quizForm = document.forms.quiz;
const sizesFieldsetsIdsArr = ["gorizontalnye-rezervuary-rgs", "gorizontalnye-rezervuary-rgsp", "vertikalnye-rezervuary", "silosy"];
const rezervuarTypeCheckboxes = quizForm.querySelectorAll('.formquiz__inputcheckbox');

const sFielsetsNodes = sizesFieldsetsIdsArr.map((id) => {
  const fs=quizForm.querySelector(`#${id}`);
  fs.classList.add('hidden');
  return fs;
});

sFielsetsNodes[0].classList.remove('hidden');

function setActiveSizesFieldset(rezType) {
  sFielsetsNodes.map((fnode)=> {
    if (fnode.id === rezType) {
      fnode.classList.remove('hidden')
    } else {
      fnode.classList.add('hidden')
    }
  })
}

Array.from(rezervuarTypeCheckboxes).map((c)=> {
  c.addEventListener('change', (evt)=> {
    setActiveSizesFieldset(quizForm.elements.rezervuartype.value);
  })
})



