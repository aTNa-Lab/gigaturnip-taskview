import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {tasksUrl} from "../../config/Urls";
import axios from "../../util/Axios";

const useStyles = makeStyles({
    root: {
        width: 300,
        // height: 200
    },
    extra: {
        marginBottom: 15
    }
});

type CardProps = { id: number, complete: boolean, name: string, description?: string, creatable?: boolean }

const TaskCard = (props: CardProps) => {
    const classes = useStyles();
    const {id, complete, name, description, creatable} = props;
    const history = useHistory()

    const handleOpen = () => {
        history.push(`${history.location.pathname}/${id}`)
    }

    const handleCreate = () => {
        let data = {stage: id}
        axios.post(tasksUrl, data)
            .then(res => res.data)
            .then(res => history.push(`${history.location.pathname}/${res.id}`))
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom={true}>
                    {name}
                </Typography>
                <Typography variant="body1" component="p">
                    {description ? description : <br/>}
                </Typography>
            </CardContent>
            <CardActions>
                {creatable ?
                    <Button size="small" onClick={handleCreate}>Create</Button>
                    :
                    <Button size="small" onClick={handleOpen}>Open</Button>
                }
            </CardActions>
        </Card>
    );
};

export default TaskCard