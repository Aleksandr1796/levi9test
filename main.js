function request(page) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://content.guardianapis.com/search?page=' + page + '&api-key=1cd01678-b5a2-4dc2-a0ad-c63c7abf6b5c', true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if(xhr.readyState != 4) return;
		if(xhr.status != 200) {
			console.log(xhr.status + ":" + xhr.statusText);
			document.querySelector('.refresh-news-butt').innerText = "Sorry, we couldn`t find news for you. Please try again later";
			document.querySelector('.refresh-news-butt').className = 'error';
			document.querySelector('.control').innerHTML = "";
		}
		else {
			let itemsArr = JSON.parse(xhr.responseText).response.results;
		itemsArr.forEach(function(item) {
			let itemBody = document.createElement('LI');
			itemBody.className = 'item';
			itemBody.innerHTML = "<div class='collapsible-header'><p>" + item.webTitle + "</p> <i class='material-icons'>expand_more</i></div><div class='collapsible-body'><p>" + item.webTitle + "</p><a target='_blank' href=" + item.webUrl + ">Read full news</a></div>";
			document.querySelector('.collapsible').appendChild(itemBody);
			document.querySelector('.countPages').innerText = JSON.parse(xhr.responseText).response.pages;
		});
		}
	}
}
function changePage(e) {
	e.preventDefault();
	document.querySelector('.list').innerHTML = "";
	let currPage = document.querySelector('.currPage > p > span:first-child').innerText;
	if(this.className.search('prev') !== -1) {
		if(currPage > 1) {
			currPage--;
			document.querySelector('.currPage > p > span:first-child').innerText = currPage;
			request(currPage);
		}
	}
	else {
		currPage++;
		document.querySelector('.currPage > p > span:first-child').innerText = currPage;
		request(currPage);
	}
}
function refresh(e) {
	e.preventDefault();
	document.querySelector('.list').innerHTML = "";
	let currPage = document.querySelector('.currPage > p > span:first-child').innerText;
	request(currPage);
}
document.querySelector('.refresh-news-butt').addEventListener('click', refresh);
let controlButtons = document.querySelectorAll('.item-control');
controlButtons.forEach(function(item) {
	item.addEventListener('click', changePage);
});
request(1);
$(document).ready(function(){
    $('.collapsible').collapsible();
});