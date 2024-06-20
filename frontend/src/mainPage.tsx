import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe} from "@fortawesome/free-solid-svg-icons";

const MainPage = () =>{
    const res = {} /// object (website Name(webName) ; email ; Number acc in this website sorted in props (recent ;favorite))
    return (

        <div className="flex h-full w-full">
            <div>
                <h3>{props.title}</h3>
                {res.map((data)=>{
                    <hr />
                    <div className="flex flex-row justify-between [&>*]:mr-5">
                        <FontAwesomeIcon icon={faGlobe} />
                        <div className="flex flex-col">
                            <p className="text-xl">{data.webName}</p>
                            <p>{data.email}</p>
                        </div>



                    </div>
                })}
            </div>
        </div>
    )
}
export default MainPage;