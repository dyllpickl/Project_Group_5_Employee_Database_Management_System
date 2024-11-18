function DeleteButton(param) {
  const deleteProfile = (event) => {
    event.preventDefault();
    const profileId = { id: param.profile_id };
    fetch("/deleteProfile", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileId),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    param.refreshFunc();
  };

  return (
    <div>
      <button
        onClick={deleteProfile}
        class="btn btn-secondary"
        style={{marginRight: "10px"}}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteButton;
