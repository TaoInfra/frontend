import React, { useEffect } from "react"

interface User {
  name: string | null;
  id: string | null;
  email: string | null;
  createdAt: number | null;
}

declare global {
  interface Window {
    // eslint-disable-next-line no-unused-vars
    intercomSettings: any;
  }
}

export const IntercomSettings: React.FC<{ user: User | null | undefined }> = ({ user }) => {
	useEffect(() => {
		window.intercomSettings = {
			api_base: "https://api-iam.intercom.io",
			app_id: "nlydre5m",
			name: user?.name, // Full name
			user_id: user?.id, // a UUID for your user
			email: user?.email, // the email for your user
			created_at: user?.createdAt, // Signup date as a Unix timestamp
		};
	}, [user]);

	return null;
};
export const IntercomScript: React.FC = () => {

	useEffect(() => {
		const script = document.createElement('script');
		script.async = true;
		script.type = 'text/javascript';

		// Add the text inside the script tag
		script.innerHTML = `
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/nlydre5m';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
        `
		document.body.appendChild(script);
	}, []);
	return (
		null
	)
}

