import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../component/UI/LoadingSpinner';
import Card from '../component/UI/Card';
import Button from '../component/UI/Button';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    bio: '',
    password: '',
    passwordConfirm: '',
  });

  // const [loadedImage, setLoadedImage] = useState('');

  const { name, email, bio, password, passwordConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (e.target.files && e.target.files.length === 1) {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
    }

    const convertFormData = new FormData();
    convertFormData.append('name', formData.name);
    convertFormData.append('email', formData.email);
    convertFormData.append('image', formData.image);
    convertFormData.append('bio', formData.bio);
    convertFormData.append('password', formData.password);
    convertFormData.append('passwordConfirm', formData.passwordConfirm);

    dispatch(register(convertFormData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="form">
        <div className="mb"></div>
        <Card
          heading={
            <h1 className="center mr">
              <FaUser className="sm-side-margin" />
              Register
            </h1>
          }
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accepts=".jpg,.png,.jpeg"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter your bio"
                id="bio"
                name="bio"
                value={bio}
                onChange={onChange}
                rows="4"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Please password confirm"
                id="passwordConfirm"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Card>
      </section>
    </>
  );
}
export default Register;
