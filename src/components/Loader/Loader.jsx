import { ThreeDots } from "react-loader-spinner";
import css from './Loader.module.css';

export default function Loader() {
    return (
        <div className={css.LoaderOverlay}>
           
            <ThreeDots
            height="100"
            width="100"
            color="#fff96d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
         <p>Loading</p>
        <ThreeDots
            height="100"
            width="100"
            color="#fff96d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
        
        </div>
    )
}