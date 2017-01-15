postText = 'this is a #test of #hashtags and @usernames';
var hashtags = new RegExp('#([^\\s]*)','g');
postText1 = postText.replace(hashtags, 'REPLACED');
var handles = new RegExp('@([a-zA-Z0-9\_\.]+)','g');
postText2 = postText1.replace(handles, 'REPLACED');

console.log(postText1);
console.log(postText2);
