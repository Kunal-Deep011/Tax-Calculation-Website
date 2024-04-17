document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("taxForm");
  const ageField = document.getElementById("age");
  const incomeField = document.getElementById("annualIncome");
  const incomeError = document.querySelector(".incomeError");
  const extraIncomeField = document.getElementById("extraIncome");
  const extraIncomeError = document.querySelector(".extraIncomeError");
  const deductionField = document.getElementById("deductionMoney");
  const deductionError = document.querySelector(".deductionError");
  const calculateBtn = document.getElementById("calculateButton");
  const closeBtn = document.getElementById("closeButton"); 
  const resultField = document.getElementById("resultField");
  const modal = document.getElementById("modal");

  calculateBtn.addEventListener('click', function(e){
     
    e.preventDefault();
    // Reset error messages------------

    incomeError.style.display="none";
    extraIncomeError.style.display="none";
    deductionError.style.display="none";

    // Valid inputs--------------------

    let isValid = true;
    if(!incomeField.value || isNaN(incomeField.value) || incomeField.value < 0){
       incomeError.style.display = "block";
       isValid = false;
    }

    if(!extraIncomeField.value || isNaN(extraIncomeField.value) || extraIncomeField.value < 0){
      extraIncomeError.style.display = "block";
      isValid = false;
    }

    if(!ageField.value){
      isValid = false;
    }

    if(!deductionField.value || isNaN(deductionField.value) || deductionField.value < 0){
      deductionError.style.display = "block";
      isValid = false;
   }

   if (isValid){

     // Tax calculation-----------------

     const age = ageField.value;
     const income = parseFloat(incomeField.value);
     const extraIncome = parseFloat(extraIncomeField.value);
     const deductions = parseFloat(deductionField.value);
     let taxRate = 0;
     if(age === "<40"){
       taxRate = 0.3;
     } else if(age === ">=40&<60"){
      taxRate = 0.4;
     } else if (age === ">=60") {
      taxRate = 0.1;
    }
    
   // income after deduction
    const overallIncome = income + extraIncome - deductions;

    if(overallIncome > 800000){
      const taxableIncome = (overallIncome - 800000) ;
      const taxAmount = taxableIncome * taxRate;

      //payable amount after tax deduction

      const payableAmount = overallIncome - taxAmount;
      const result = (payableAmount).toFixed(2);
      resultField.textContent = result;
      modal.style.display = "flex";
      form.style.display = "none";
    }else{
      const result = (overallIncome).toFixed(2);
      resultField.textContent = result;
      modal.style.display = "flex";
      form.style.display = "none";
    }
    
   }
   
  });

  closeBtn.addEventListener('click', function(){

    incomeField.value = "";
    extraIncomeField.value = "";
    deductionField.value = "";
    ageField.value = "";

    modal.style.display = "none";
    form.style.display = "flex";
      
  });

});