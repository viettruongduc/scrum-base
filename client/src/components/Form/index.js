import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { Autocomplete, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { deviceData } from '../../data/data'
import styles from './style.module.scss'

const baseURL = process.env.REACT_APP_BASE_URL

const Comments = (props) => {

  const { modalIsOpen, afterOpenModal, onRequestClose, fetchTasks, taskSelected } = props;
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState();
  const [device, setDevice] = useState();

  const onSubmit = async data => {
    data.status = taskSelected;
    data.device = device;
    const month = deadline.getMonth() + 1;
    let monthConverted
    switch (month) {
      case 1: monthConverted = 'Jan'; break;
      case 2: monthConverted = 'Feb'; break;
      case 3: monthConverted = 'Mar'; break;
      case 4: monthConverted = 'Apr'; break;
      case 5: monthConverted = 'May'; break;
      case 6: monthConverted = 'Jun'; break;
      case 7: monthConverted = 'Jul'; break;
      case 8: monthConverted = 'Aug'; break;
      case 9: monthConverted = 'Sep'; break;
      case 10: monthConverted = 'Oct'; break;
      case 11: monthConverted = 'Nov'; break;
      case 12: monthConverted = 'Dec'; break;
      default: break;
    }
    data.deadline = monthConverted + ' ' + deadline.getDate();

    await axios.post('/', { data }, { baseURL })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));

    reset();
    onRequestClose();
    fetchTasks();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className={styles.modalCreate}
    >
      <h2>Create a task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInline}>
          <label className={styles.labelCustom}>Title</label>
          <TextField name="title"  {...register("title")} style={{ width: '100%' }} />
        </div>

        <div className={styles.formInline}>
          <label className={styles.labelCustom}>Device</label><br />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={deviceData}
            onChange={(event, data) => setDevice(data.value)}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>

        <div className={styles.formInline}>
          <label className={styles.labelCustom}>Label</label><br />
          <TextField name="label"  {...register("label")} sx={{ width: 350 }} />

          <label className={styles.labelCustom}>Deadline</label><br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              isRequired={true}
              sx={{ width: 334 }}
              onChange={(value) => setDeadline(value)}
              format="yyyy-MMM-dd"
            />
          </LocalizationProvider>
        </div>

        <div className={styles.formInline}>
          <label className={styles.labelCustom}>Link</label><br />
          <TextField name="link"  {...register("link")} style={{ width: '100%' }} />
        </div>

        <div className={styles.buttonWrapper}>
          <input type="button" value="Cancel" className={styles.cancelButton} onClick={onRequestClose}></input>
          <input type="submit" value="Create"></input>
        </div>
      </form>
    </Modal>
  );
};

export default Comments;
