import React from "react";
import { Dialog, TextField, Button } from "@mui/material";

const EditModal = ({ entry, setEntry, setData }) => {
  const handleSave = () => {
    setData(prev => prev.map(item => (item.id === entry.id ? entry : item)));
    setEntry(null);
  };

  return (
    <Dialog open={Boolean(entry)} onClose={() => setEntry(null)}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Entry</h2>
        <TextField label="Name" value={entry?.name} onChange={e => setEntry({ ...entry, name: e.target.value })} fullWidth className="mb-3" />
        <Button onClick={handleSave} variant="contained" color="success">Save</Button>
      </div>
    </Dialog>
  );
};

export default EditModal;
