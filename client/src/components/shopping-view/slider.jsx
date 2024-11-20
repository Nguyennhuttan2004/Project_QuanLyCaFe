import React from 'react';
import { useState } from 'react';
import "../../css/slider.css";
import { useNavigate } from 'react-router-dom';

const Slider = () => {
    const imgs = [
        { id: 0, value: "../../../src/assets/tra-xanh.png" },
        { id: 1, value: "../../../src/assets/bac-xiu.png" },
        { id: 2, value: "../../../src/assets/image/home-img-1 (3).png" },
        { id: 3, value: "../../../src/assets/tra-sen-vang.png" }
    ];
    const [sliderData, setSliderData] = useState(imgs[0]);
    const navigate = useNavigate();

    const handleClick = (index) => {
        const slider = imgs[index];
        setSliderData(slider);
    }

    const handleBuyNow = () => {
        navigate(`/shop/listing`); 
    }

    return (
        <div className='aka'>
            <section className='home' id='home'>
                <div className="row">
                    <div className="content">
                        <h3 className='mb-10'>Điểm đến lý tưởng cho những trải nghiệm cà phê đặc biệt!</h3>
                        <button onClick={handleBuyNow} className='btn'>Mua ngay</button> {/* Use button instead of anchor */}
                    </div>
                    <div className="image rounded-md">
                        <img src={sliderData.value} alt="" className='main-home-image ' />
                    </div>
                </div>

                <div className="image-slider gap-4">
                    {
                        imgs.map((data, i) =>
                            <img key={data.id} src={data.value} onClick={() => handleClick(i)} />
                        )
                    }
                </div>
            </section>
        </div>
    );
}

export default Slider;