import Card from '../component/UI/Card';
import Button from '../component/UI/Button';

import styles from './ProjectItem.module.css';

function ProjectItem({ project }) {
  const { title, description, git_url, url, createdAt } = project;
  const date = new Date(createdAt).toLocaleString('en-GB').split(',')[0];

  return (
    <Card projectHead={title}>
      <p className={styles.description}>{description}</p>

      {git_url ? (
        <a href={`${git_url}`} target="_blank" rel="noopener noreferrer">
          <Button type="button">GIT Repo</Button>
        </a>
      ) : null}
      {url ? (
        <a href={`${url}`} target="_blank" rel="noopener noreferrer">
          <Button type="button">Live Project</Button>
        </a>
      ) : null}

      <p className={styles.date}>Published: {date}</p>
    </Card>
  );
}
export default ProjectItem;
