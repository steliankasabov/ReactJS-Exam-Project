import React from 'react';

const PlaysMap = () => {
    const mapHtml = { __html: '<iframe src="https://www.google.com/maps/d/embed?mid=1hidGt78tIxMFuzdnF4hW2HWi09uoTkQ&ehbc=2E312F" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' };

    return (
        <div dangerouslySetInnerHTML={mapHtml} />
    );
}

export default PlaysMap;
