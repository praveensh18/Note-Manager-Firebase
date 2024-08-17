import React, { useState } from 'react';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import s from './style.module.css';
import ButtonPrimary from 'components/ButtonPrimary/ButtonPrimary';
import { ValidatorService } from 'utils/validator';
import FieldError from 'components/FieldError/FieldError';

const VALIDATOR = {
  title: (inputValue) => {
    return (
      ValidatorService.min(inputValue, 3) ||
      ValidatorService.max(inputValue, 20)
    );
  },
  content: (inputValue) => {
    return ValidatorService.min(inputValue, 3);
  },
};

const NoteForm = ({
  title,
  note,
  isEditable = true,
  onClickEdit,
  onClickDelete,
  onSubmitBtn,
}) => {
  const [formValues, setFormValues] = useState({
    title: note?.title || '',
    content: note?.content || '',
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : true,
    content: note?.content ? undefined : true,
  });

  const updateFormValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: VALIDATOR[name](value) });
  };

  const hasError = () => {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  };

  const actionIcons = (
    <>
      <div className='col-1'>
        {onClickEdit && <PencilFill className={s.icon} onClick={onClickEdit} />}
      </div>
      <div className='col-1'>
        {onClickDelete && (
          <TrashFill className={s.icon} onClick={onClickDelete} />
        )}
      </div>
    </>
  );

  const titleInput = (
    <div className='mb-5'>
      <label className='form-label'>Title</label>
      <input
        onChange={updateFormValues}
        type='text'
        name='title'
        className='form-control'
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const contentInput = (
    <div className='mb-5'>
      <label className='form-label'>Content</label>
      <textarea
        type='text'
        onChange={updateFormValues}
        name='content'
        className='form-control'
        row='5'
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitBtn = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisabled={hasError()}
        onBtnClick={() => onSubmitBtn(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );

  return (
    <div className={s.container}>
      <div className='row justify-content-space-between'>
        <div className='col-10'>
          <h2 className='mb-3'>{title}</h2>
        </div>
        {actionIcons}
      </div>

      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className='mb-3'>
        {isEditable ? contentInput : <pre style={{whiteSpace: 'break-spaces'}}>{note.content}</pre>}
      </div>
      {onSubmitBtn && submitBtn}
    </div>
  );
};

export default NoteForm;
