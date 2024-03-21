import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/Authprovider";
import { useContext } from "react";


const CheckOut = () => {
    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const { user } = useContext(AuthContext)

    const handelCheckOut = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
                customerName: name,
                email,
                date,
                img,
                service: title,
                service_id: _id,
                price: price,
        }
        console.log(booking);
        fetch('https://car-doctor-server-one-beta.vercel.app/bookings', {
            method: 'POST',
            headers: {
                    'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then( data =>{
            console.log(data);
            if(data?.insertedId){
                alert('service successfully updated')
            }
        })

    }

    return (
        <div>
            <h2 className="text-center text-3xl">Book service {title}</h2>

            <form onSubmit={handelCheckOut}>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} name="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due amount</span>
                        </label>
                        <input type="text" defaultValue={'$' + price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">

                    <input className="btn btn-info btn-block" type="submit" value="Order Conform" />
                </div>
            </form>
            <div className="card-body">

            </div>
        </div>
    );
};

export default CheckOut;