import Chef from '../../../assets/home/chef-service.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const ChefService = () => {
    return (
        <section>
            <SectionTitle subHeading={'---From 11:00am to 10:00pm---'}
                heading={'ORDER ONLINE'}>
            </SectionTitle>
            <div className="mb-24 card w-full">
                <figure><img src={Chef} alt="Shoes" /></figure>
                <div className='card shadow-x bg-white text-center text-white space-y-5'>
                    <h2 className='text-4xl font-normal -mt-64'>Bistro Boss</h2>
                    <p className='text-xl font-normal leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum<br />deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto<br />ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>
        </section>
    );
};

export default ChefService;