function setScriptTag(url,next){var scriptTag=document.createElement("script");scriptTag.type="text/javascript",scriptTag.src=url,scriptTag.defer=!0,document.head.appendChild(scriptTag),next&&(scriptTag.onload=next)}