import { ThreeDots } from 'react-loader-spinner';
import 'index.css';

export const Loader = () => {
  return (
    <div className="loader ">
      <ThreeDots
        height="80"
        width="80"
        radius="12"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
        wrapperClassName="loader"
      />
    </div>
  );
};
