export const UserProfile = ({isEditing, handleChange, userData}) => {

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} onChange={handleChange} value={userData.name} type="text" className="form-control" name="name" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} onChange={handleChange} value={userData.email} type="email" className="form-control" name="email" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} onChange={handleChange} value={userData.phone || ''} type="number" className="form-control" name="phone" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="bloodGroup" className="col-sm-2 col-form-label">Blood Group</label>
        <div className="col-sm-10">
          <input disabled readOnl value={userData.bloodGroup} type="text" className="form-control" name="bloodGroup" />
        </div>
      </div>  
    </>
  )
}
