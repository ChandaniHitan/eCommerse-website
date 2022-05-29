fetch("https://www.aimn.com/products.json?limit=28")
	.then((data) => {
		return data.json();
	}).then((completedata) => {
		let products = "";
		completedata.products.map((values, key) => {
			products += `<section class="card">
			<section class = "carousel-container">
			<i class="fa-solid fa-arrow-left" id="prevBtn-${key}"></i>
			<i class="fa-solid fa-arrow-right" id= "nextBtn-${key}"></i>
			<section class ="carousel-slide_${key} slide-${key}">
			${getImage(values)}
			</section>
			</section>
			<section class="detailsGrid">
					<p class="title">${values.title}</p>
					<p class="size">${values.options[0].values}</p>
				</section>	
				<section>	
					<section><p class="price">$${values.variants[0].price}</p></section>
				</section>	
			</section>  
		</section>`
		});
		document.getElementById("products").innerHTML = products;
		for (let index = 0; index < completedata.products.length; index++) {
			slideImage(index)
		}
		const year = new Date().getFullYear();
		console.log(year);
		document.getElementById('copyright').innerHTML = `Copyright © ${year} All rights reserved`;
	}).catch((error) => {
		console.log(error)
	})

function getImage(values) {
	let value = "";
	for (let index = 0; index < values.images.length; index++) {
		value += `<img class="images" src=${values.images[index].src} alt="img">`;
	}
	return value;

}

/* Image Carousel */
function slideImage(key) {
	const carouselSlide = document.querySelector(`.carousel-slide_${key}`)
	const carouselImages = document.querySelectorAll(`.slide-${key} img`)

	const prevBtn = document.querySelector(`#prevBtn-${key}`)
	const nextBtn = document.querySelector(`#nextBtn-${key}`)

	let counter = 0;
	const size = carouselImages[0].clientWidth;

	nextBtn.addEventListener('click', () => {
		if (counter >= carouselImages.length - 1) return;
		carouselSlide.style.transition = "transform 0.4s ease-in-out"
		counter++;
		carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
	})

	prevBtn.addEventListener('click', () => {
		if (counter <= 0) return;
		carouselSlide.style.transition = "transform 0.4s ease-in-out"
		counter--;
		carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
	})
}


/*Sticky Navbar*/
const nav = document.querySelector('#nav');
let navTop = nav.offsetTop;

function fixedNav() {
	if (window.scrollY >= navTop) {
		nav.classList.add('fixed');
	} else {
		nav.classList.remove('fixed');
	}
}
window.addEventListener('scroll', fixedNav);

