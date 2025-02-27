import React from "react";
import { Dialog, Button } from "@mui/material";

const DeleteModal = ({ entry, setEntry, setData }) => {
  return (
    <Dialog open={Boolean(entry)} onClose={() => setEntry(null)}>
      <div className="p-6 text-center">
        <h2>Are you sure you want to delete?</h2>
        <Button onClick={() => { setData(prev => prev.filter(item => item.id !== entry.id)); setEntry(null); }} color="error">Delete</Button>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
