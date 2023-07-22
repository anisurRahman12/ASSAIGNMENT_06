const loadToolsData =async()=>{
    const URL =`https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    displayToolsData(data.data.tools);
};

const displayToolsData =users=>{
  if(users.length > 6){
      users = users.slice(0, 6);
    }
    else{
       
    }
   for(const user of users){
    const cardContainer = document.getElementById('card-container');
    const card = document.createElement('div');
    card.classList.add('col-sm-12', 'col-md-6' ,'col-lg-4');
    card.innerHTML =`
     <div class="card p-1">
     <div class="card-body">
     <img src="${user.image}" style="width:437px; height:170px;" class="card-img-top img-fluid" alt="...">
           <h5 class="card-text mt-2">Features</h5>
           <ol>
             <li>${user.features[0]}</li>
             <li>${user.features[1]}</li>
             <li>${user.features[2]}</li>
           </ol>
           <hr class="mt-4 mb-1"/>

           <div class="d-flex flex-row justify-content-between">
             <div class="mt-3">
                 <div><h5>${user.name}</h5></div>
                 <div><i class="fa-solid fa-calendar-days"></i><span class="ms-2">${user.published_in}</span></div>
             </div>
             <div class="mt-5"> <a href="#" class=" text-danger"><i class="fa-solid fa-arrow-right" onclick="displayToolsSingleData('${user.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></a></div>                         
           </div>
         </div>
       </div>
     `
     cardContainer.appendChild(card);
   }
   
}
const displayToolsSingleData =async id =>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalData(data.data);
  }
   
  const displayModalData=(modal_Details) => {
      const {description, pricing, features, integrations, image_link, accuracy, input_output_examples} = modal_Details;
      const cardLeftDetails = document.getElementById('card-left-title');
      cardLeftDetails.innerText = description;
      for(const price of pricing){
         const pricingContainer = document.getElementById('pricin-container');
         const div = document.createElement('div');
         div.innerHTML=`
         <p style="width: 132px; height: 100px;" class="bg-white p-4 rounded-2">${price.price ? price.price : "No Data Found"}</p> 
         `;
         pricingContainer.appendChild(div);
         
      }
      const featureContainer = document.getElementById('features-list');
      const li = document.createElement('li');
      li.innerHTML =`
      <li>${features[1].feature_name ? features[1].feature_name : 'Undefined'}</li>
      <li>${features[2].feature_name ? features[2].feature_name : 'Undefined'}</li>
      <li>${features[3].feature_name ? features[3].feature_name : 'Undefined'}</li>
      `;
      featureContainer.appendChild(li);
      
      for(const integration of integrations){
      
          const integrationsList = document.getElementById('integrations-list');
          const li = document.createElement('li');
          li.innerHTML = `
            <li class="pe-3">${integration ? integration : 'Undefined' }</li>
          `;
          integrationsList.appendChild(li);
      };
      
     const modalImg = document.getElementById('modal-img');
      modalImg.innerHTML =`
      <img src="${image_link[0]}" class="card-img-top img-fluid rounded-2" alt="...">
      `;
     const accuracyDetails = document.getElementById('inner-accuracy');
     accuracyDetails.innerHTML =`
     <p style="width: 140px; height:32px;" class="btn-danger text-white text-center rounded-2 position-absolute top-0 end-0">${accuracy.score*100}% accuracy</p>
     `; 
     const cardInputOutput = document.getElementById('card-input-output');
     cardInputOutput.innerHTML=`
     <h5 class="card-title">${input_output_examples[0].input}</h5>
     <p>${input_output_examples[0].output}</p>
     `;
  }
   
  
  const modalDataClean = () =>{
      const pricingContainer = document.getElementById('pricin-container');
      pricingContainer.innerHTML='';
      const featureContainer = document.getElementById('features-list');
      featureContainer.innerHTML = '';
      const integrationsList = document.getElementById('integrations-list');
      integrationsList.innerHTML='';
  }
  
