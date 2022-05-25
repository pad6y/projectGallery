import { useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import Button from '../UI/Button';

import styles from './UsersCard.module.css';

function UsersCard(props) {
  const { name, createdAt, _id, image, bio } = props.user;
  const navigate = useNavigate();

  const date = new Date(createdAt).toLocaleString('en-GB').split(',')[0];

  const viewHandler = () => {
    navigate(`/userprojects/${_id}`);
  };

  return (
    <Card projectHead={name}>
      <div className={styles.date}>Joined : {date}</div>

      {image === '' && (
        <img
          className={styles.card_head_img}
          src="https://i.pinimg.com/564x/9c/97/e7/9c97e7a49380b364cd3792ec0f6004bb.jpg"
          alt="avator"
        />
      )}

      {image !== '' && (
        <img
          className={styles.card_head_img}
          src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
          alt="avator"
        />
      )}
      <p className={styles.card_bio}>{bio}</p>

      <div className={styles.btn}>
        <Button type="button" onClick={viewHandler}>
          View
        </Button>
      </div>
    </Card>
  );
}
export default UsersCard;
