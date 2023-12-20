
const Phone = () => { 
    return (
        <div className="collapse bg-base-200">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-neutral text-primary-content peer-checked:bg-sky-500 peer-checked:text-secondary-content">
            Call 01817953110
            </div>
            <div className="collapse-content bg-sky-500 text-primary-content peer-checked:bg-neutral peer-checked:text-secondary-content">
            Call 01817953110
            </div>
        </div>
    );
};

export default Phone;