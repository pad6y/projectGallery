//Implement images and users page/////////
import Card from '../UI/Card';
import Button from '../UI/Button';

import styles from './UsersCard.module.css';

function UsersCard(props) {
  const { name, createdAt, _id } = props.user;

  const date = new Date(createdAt).toLocaleString('en-GB').split(',')[0];

  const viewHandler = () => {
    console.log(_id);
  };

  return (
    <Card projectHead={name}>
      <img
        className={styles.card_head_img}
        src="https://i.pinimg.com/564x/9c/97/e7/9c97e7a49380b364cd3792ec0f6004bb.jpg"
        alt="avator"
      />

      <div className={styles.date}>Joined : {date}</div>
      <div className={styles.btn}>
        <Button type="button" onClick={viewHandler}>
          View
        </Button>
      </div>
    </Card>
  );
}
export default UsersCard;
