import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface Props{
    title:string
    open:boolean
    setOpenDialog:(value:boolean)=>void
}

export default function DialogMassage({title,open,setOpenDialog}:Props) {

    const handleClose = () => setOpenDialog(false)
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title} Changed Successfully</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your {title} has been changed successfully.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus className="text-[#002379]">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
