import ProjectForm from '../component/ProjectComponents/ProjectForm';

import styles from './Dashboard.module.css';
function Create() {
  return (
    <>
      <section className={`heading ${styles.dash_container}`}>
        <h2 className={styles.text}>Add Project</h2>
      </section>

      <div className="content">
        <ProjectForm />
      </div>
    </>
  );
}
export default Create;
