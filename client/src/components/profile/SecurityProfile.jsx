export const SecurityProfile = ({isEditing, handleChange, securityData}) => {

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} type="number" className="form-control" id="phone" />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="bloodGroup" className="col-sm-2 col-form-label">Blood Group</label>
        <div className="col-sm-10">
          <input disabled={!isEditing} readOnly={!isEditing} type="text" className="form-control" id="bloodGroup" />
        </div>
      </div>
    </>
  )
}
