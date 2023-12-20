import { Parallax } from 'react-parallax';

const Cover = ({img, title,}) => {
    return (
        <Parallax
        blur={{ min: -40, max: 40 }}
        bgImage={img}
        bgImageAlt="the menu"
        strength={-200}
    >
       <div className="hero h-[500px]"> 
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5 uppercase">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias labore sequi cumque dolore, voluptate et excepturi expedita.</p>
                    
                </div>
            </div>
        </div>
    </Parallax>
        
    );
};

export default Cover;