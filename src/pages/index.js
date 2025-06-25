import './tw.css';
import './index.css';


import '../images/favicon.svg';

const quizForm = document.forms.quiz;
const rezFieldsetsIdsArr = ["gorizontalnye-rezervuary-rgs", "gorizontalnye-rezervuary-rgsp", "vertikalnye-rezervuary", "silosy"];

//чекбоксы с резервуарами
const rezervuarTypeCheckboxes = quizForm.querySelectorAll('.formquiz__inputcheckbox');

//ищем fieldsets с массивами размеров
const sFielsetsNodes = rezFieldsetsIdsArr.map((id) => {
  const fs=quizForm.querySelector(`#sizes-${id}`);
  fs.classList.add('hidden');
  return fs;
});
//открываем первый массив (по умолчанию выбран 1 главный чекбокс)
sFielsetsNodes[0].classList.remove('hidden');

//ищем fieldsets с массивами размеров
const staffFielsetsNodes = rezFieldsetsIdsArr.map((id) => {
  const fs=quizForm.querySelector(`#staff-${id}`);
  fs.classList.add('hidden');
  return fs;
});
//открываем первый массив (по умолчанию выбран 1 главный чекбокс)
staffFielsetsNodes[0].classList.remove('hidden');



function setActiveSizesFieldset(rezType) {
  sFielsetsNodes.map((fnode)=> {
    if (fnode.id === `sizes-${rezType}`) {
      fnode.classList.remove('hidden')
    } else {
      fnode.classList.add('hidden')
    }
  })
}

function setActiveStaffFieldset(rezType) {
  staffFielsetsNodes.map((fnode)=> {
    if (fnode.id === `staff-${rezType}`) {
      fnode.classList.remove('hidden')
    } else {
      fnode.classList.add('hidden')
    }
  })
}

Array.from(rezervuarTypeCheckboxes).map((c)=> {
  c.addEventListener('change', (evt)=> {
    setActiveSizesFieldset(quizForm.elements.rezervuartype.value);
    setActiveStaffFieldset(quizForm.elements.rezervuartype.value);
  })
})



