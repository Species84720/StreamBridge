(function(){'use strict';
 var c=window.StreamBridgeStoreConfig||{},id='StreamBridge_debug',result=document.getElementById('result'),url=document.getElementById('url'),busy=false;
 function say(s){result.textContent=s;}
 function refreshLauncher(){
  try{if(typeof window.refreshAppsOnHisenseUI==='function'){window.refreshAppsOnHisenseUI(id);return true;}
   var bridge=window.omi_platform||window.opera_omi;
   if(bridge&&typeof bridge.sendPlatformMessage==='function'){bridge.sendPlatformMessage(JSON.stringify({type:'APPMessage',MsgType:'appControl',action:'updateAppState',source:'browser',startAppType:2,param:{event:'AllAppsUpdate',SubModuleName:'AllApps',startFrom:'',appInfo:id}}));return true;}
  }catch(e){}return false;
 }
 function valid(raw){var a=document.createElement('a');a.href=raw;return /^(http:|https:)$/.test(a.protocol)&&!!a.hostname&&!a.username&&!a.password&&!/[\s]/.test(raw);}
 url.value=c.appUrl||'http://192.168.68.73:8088/app/';document.getElementById('dns-ip').textContent=c.serverAddress||'192.168.68.73';
 function check(){var available=typeof window.Hisense_installApp==='function';say(available?'TV install API detected. Choose Install StreamBridge.':'TV install API is unavailable here. Open https://vidaahub.com/ with the temporary TV DNS set to '+(c.serverAddress||'192.168.68.73')+'. If it remains unavailable there, this firmware does not support this community method. Open receiver now remains available.');return available;}
 document.getElementById('install').onclick=function(){if(busy||!check())return;if(!valid(url.value)){say('Enter an HTTP or HTTPS receiver address.');return;}busy=true;say('Waiting for the TV installation callback…');var icon=location.protocol+'//'+location.host+location.pathname.replace(/[^/]*$/,'')+'app-icon.png';
  try{window.Hisense_installApp(id,'StreamBridge',icon,icon,icon,url.value,'store',function(status){busy=false;if(status!==false&&status!==0){say('No successful installation has been confirmed. TV callback: '+String(status)+'. Check Home / My Apps and TV support.');return;}var refreshed=refreshLauncher();say('The TV reported installation success. '+(refreshed?'A home-screen refresh was requested. ':'The launcher refresh API is unavailable. ')+'Restore your original TV DNS, close this browser and check Home / My Apps. Restart the TV if needed. The tile has not been independently verified.');});}catch(e){busy=false;say('Installation failed: '+e.message);}
 };
 var refresh=document.getElementById('refresh');if(refresh)refresh.onclick=function(){say(refreshLauncher()?'Home-screen refresh requested. Close this browser and check Home / My Apps; restart the TV if it is still missing.':'This page cannot access the launcher refresh bridge. Try it from the local vidaahub.com installer, or restart the TV.');};
 document.getElementById('open').onclick=function(){if(!valid(url.value)){say('Enter a valid receiver URL.');return;}location.href=url.value;};
 document.getElementById('check').onclick=check;document.getElementById('options').onclick=function(){var box=document.getElementById('advanced');box.style.display=box.style.display==='block'?'none':'block';if(box.style.display==='block')url.focus();};document.getElementById('exit').onclick=function(){window.close();};
 document.addEventListener('keydown',function(e){var key=e.keyCode;if(key===461||key===10009||e.key==='Escape'){e.preventDefault();window.close();return;}if(key>=37&&key<=40&&document.activeElement!==url){var all=Array.prototype.filter.call(document.querySelectorAll('button,input'),function(n){return !n.disabled&&n.offsetWidth>0;}),at=all.indexOf(document.activeElement),next=Math.max(0,Math.min(all.length-1,at+(key===37||key===38?-1:1)));e.preventDefault();if(all[next])all[next].focus();}});
 check();document.getElementById('install').focus();
}());
