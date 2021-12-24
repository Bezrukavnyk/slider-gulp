
export function addLoadedClass() {
	// фукция для прелоадера 
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}

    let slideIndex = 1;
	let offset = 0;
    let slides = document.querySelectorAll('.slide-ibg'),
        prev = document.querySelector('.btn-prev-ibg'),
        next = document.querySelector('.btn-next-ibg'),
		productContainer = document.querySelector('.slide-product'),
		productSlides = document.querySelectorAll('.product-slide'),
		productWrapper = document.querySelector('.product-wrapper'),
		widthContainer = window.getComputedStyle(productContainer).width,
		widthValue = widthContainer.match(/\d/g).join('');
        productWrapper.style.cssText = `width : ${widthValue * productSlides.length}px;`

//  фун-я переключения основоного слайдера   
    function showSlides(n) {
		if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
		function removeClass (Class) {
			slides.forEach((item) => item.classList.remove(Class));
		}
        removeClass ('_active');
		slides[slideIndex - 1].classList.add('_active');
    }


    function plusSlides (n) {
        showSlides(slideIndex += n);
    }

// функии перекллючения слайдера продукта
	function prevProduct (){
		if(offset == 0){
			offset =  widthValue * (productSlides.length - 1);
		 }else{
		 offset -= +widthValue;
		 }
		 productWrapper.style.cssText = `transform: translateX(-${offset}px); width : ${widthValue * productSlides.length}px;`
	}

    function nextProduct (){
		if(offset ==  widthValue * (productSlides.length - 1)){
			offset = 0;
		 }else{
			 offset += +widthValue;
		 }
		 productWrapper.style.cssText = `transform: translateX(-${offset}px); width : ${widthValue * productSlides.length}px;`
	}

// вызов функций
    prev.addEventListener('click', function(){
        plusSlides(-1);
		prevProduct();
    });

    next.addEventListener('click', function(){
        plusSlides(1);
		nextProduct();
	 });

    showSlides(slideIndex);


// функция переключения по свайпу

	let eventOdject = document.querySelectorAll('.slide__main--product-ibg');

	  eventOdject.forEach((swipe)=>{

	    swipe.addEventListener('touchstart', TouchStart, false);
		swipe.addEventListener('touchmove', TouchMove, false);

	let x1 = null;
	let y1 = null;
	
	
	function TouchStart(event){
		x1 = event.touches[0].clientX;
		y1 = event.touches[0].clientY;
	
	}
	function TouchMove(event){
        if(!x1 || !y1){
			return;
		}
	  let x2 = event.touches[0].clientX;
	  let y2 = event.touches[0].clientY;
	  
	  let differenceX = x2 - x1;
	  let differenceY = y2 - y1;


	  if(Math.abs(differenceX) > Math.abs(differenceY)){
		  if(differenceX > 0 ){
			plusSlides(-1);  
			prevProduct();
		  } else if(differenceX < 0){
			plusSlides(1);
			nextProduct();
		  }
	  }
	  x1 = null;
	  y1 = null;
	}
})