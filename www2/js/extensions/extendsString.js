String.prototype.lPad = function (n,c) {
	var i;
	var a = this.split('');
	for (i = 0; i < n - this.length; i++) {
		a.unshift (c)
	};
	
	return a.join('')
}
String.prototype.rPad = function (n,c) {
	var i;
	var a = this.split('');
	for (i = 0; i < n - this.length; i++) {
		a.push (c)
	};
	
	return a.join('')
}
String.prototype.reverse = function() {
    this.split('').reverse().join('');
};
String.prototype.capitalize = function(){
   this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};
String.prototype.capitalizeFirst = function(){
   this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.replaceAll = function(search, newstring) {
	this.replace(new RegExp(search, 'g'), newstring);
}
