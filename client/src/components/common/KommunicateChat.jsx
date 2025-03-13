import React, { useEffect } from 'react';

function KommunicateChat() {
    useEffect(() => {
        (function (d, m) {
            var kommunicateSettings = {
                appId: '332c090e787a630ad7af5ea66029f9942',  
                popupWidget: true,
                automaticChatOpenOnNavigation: true
            };

            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
            var h = document.getElementsByTagName('head')[0];
            h.appendChild(s);

            window.kommunicate = m;
            m._globals = kommunicateSettings;   
        })(document, window.kommunicate || {});
    }, []);

    return (
        <div className='top-10 right-10'></div>
    );
}

export default KommunicateChat;