





// // import * as React from 'react';
// // import { Box, CircularProgress, CssBaseline, Grid, IconButton, Pagination, Popper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
// // import AppBarAndDrawer from "../components/AppBarAndDrawer";
// // import Feed from "../components/Feed";
// // import { headStudyProgramPages } from "../helpers/constants";

// // import { useNavigate } from "react-router-dom";
// // import { useSession } from "../contexts/SessionContext";
// // import { getAllHeadStudyProgramExaminers, getHeadStudyProgramProposal, getHeadStudyProgramProposalHaveExaminers } from "../api/headStudyPrograms";
// // import SettingsIcon from '@mui/icons-material/Settings';
// // function Fill() {
// //     const { token } = useSession();
// //     const [proposals, setProposals] = React.useState([]);
// //     const [examiners, setExaminers] = React.useState([]);
// //     const [total, setTotal] = React.useState(0);
// //     const [perPage, setPerPage] = React.useState(5);
// //     const [page, setPage] = React.useState(1);
// //     const [loading, setLoading] = React.useState(true);
// //     const navigate = useNavigate();

// //     function navigateToProposalDetail(id) {
// //         navigate(`/head-study-programs/proposal/detail/${id}`);
// //     }

// //     // popper component variable 
// //     const [anchorEl, setAnchorEl] = React.useState(null);
// //     const handleClick = (event) => {
// //         setAnchorEl(anchorEl ? null : event.currentTarget);
// //     };
// //     const open = Boolean(anchorEl);
// //     const id = open ? 'simple-popper' : undefined;

// //     // Get data
// //     React.useEffect(() => {
// //         async function get() {
// //             setLoading(true); // Set loading to true while fetching data
// //             try {
// //                 const response = await getHeadStudyProgramProposalHaveExaminers(token, page);
// //                 setProposals(response.data); // Adjust this according to your API response
// //                 setTotal(response.total); // Adjust this according to your API response
// //                 setPerPage(response.per_page); // Adjust this according to your API response
// //             } catch (error) {
// //                 console.log('Error get head study program proposal have examiners', error.message);
// //             } finally {
// //                 setLoading(false); // Set loading to false after fetching data
// //             }
// //         }
// //         get();
// //     }, [token, page]);

// //     const handlePageChange = (event, value) => {
// //         setPage(parseInt(value, 10));
// //     };

// //     async function handleGetAllExaminers(proposalId) {

// //         try {
// //             const response = await getAllHeadStudyProgramExaminers(token, proposalId);
// //             console.log(response);
// //             setExaminers(response);
// //         } catch (error) {
// //             console.log('Error get all examiners', error.message);
// //         }

// //     }

// //     return (
// //         <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={0} borderRadius={2} marginLeft={0}>
// //             <Table size="small">
// //                 <TableHead sx={{ background: "#EBEBEB" }}>
// //                     <TableRow>
// //                         <TableCell>No</TableCell>
// //                         <TableCell>Name</TableCell>
// //                         <TableCell>Nrp</TableCell>
// //                         <TableCell>Title</TableCell>
// //                         <TableCell>Upload Date</TableCell>
// //                         <TableCell>Status</TableCell>
// //                         <TableCell>Ubah Penguji</TableCell>
// //                     </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                     {loading ? (
// //                         <TableRow>
// //                             <TableCell colSpan={7} align="center">
// //                                 <CircularProgress />
// //                             </TableCell>
// //                         </TableRow>
// //                     ) : (
// //                         proposals.map((v, i) => (
// //                             <TableRow key={i} >
// //                                 <TableCell>{(page - 1) * perPage + i + 1}</TableCell>
// //                                 <TableCell>{v.student_name}</TableCell>
// //                                 <TableCell>{v.nrp}</TableCell>
// //                                 <TableCell>{v.title}</TableCell>
// //                                 <TableCell>{v.upload_date}</TableCell>
// //                                 <TableCell>{v.head_study_program_approval_status}</TableCell>
// //                                 <TableCell>
// //                                     <IconButton aria-describedby={id} size="small" type="button" onClick={(e) => { handleClick(e); handleGetAllExaminers(v.id); }}>
// //                                         <SettingsIcon fontSize="inherit" />
// //                                     </IconButton>
// //                                     <Popper id={id} open={open} anchorEl={anchorEl}>
// //                                         <Box sx={{ border: "0.5px solid #CFD8DC", p: 1, bgcolor: 'background.paper' }}>

// //                                             <Typography sx={{ cursor: "pointer" }} color={"red"} fontSize={"0.7rem"}>Delete</Typography>
// //                                         </Box>
// //                                     </Popper>
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))
// //                     )}
// //                 </TableBody>
// //             </Table>
// //             {!loading && (
// //                 <Box display="flex" justifyContent="center" marginY={3}>
// //                     <Pagination count={Math.ceil(total / perPage)} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
// //                 </Box>
// //             )}
// //         </Grid>
// //     );
// // }

// // const HeadStudyProgramProposalList = () => {
// //     return (
// //         <Box sx={{ display: 'flex' }}>
// //             <CssBaseline />
// //             <AppBarAndDrawer title={"Daftar Proposal"} pages={headStudyProgramPages()} />
// //             <Feed>
// //                 <Fill />
// //             </Feed>
// //         </Box>
// //     )
// // }

// // export default HeadStudyProgramProposalList;


import * as React from 'react';
import { Box, Button, CircularProgress, CssBaseline, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Popper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { headStudyProgramPages } from "../helpers/constants";

import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { getAllHeadStudyProgramExaminers, getHeadStudyProgramProposalHaveExaminers, updateProposalExaminer } from "../api/headStudyPrograms";
import SettingsIcon from '@mui/icons-material/Settings';
import { getAllExaminers } from '../api/examiners';

function Fill() {
    const { token } = useSession();
    const [proposals, setProposals] = React.useState([]);
    const [examiners, setExaminers] = React.useState([]);
    const [examinerSelected, setExaminerSelected] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const [disabledButton, setDisabledButton] = React.useState(false);
    const [disabledButton2, setDisabledButton2] = React.useState(false);

    const [newExaminer, setNewExaminer] = React.useState(" ");
    // Clean state
    React.useEffect(() => {
        if (newExaminer === " ") {
            setDisabledButton2(true)
        } else {
            setDisabledButton2(false)
        }
    }, [newExaminer]);

    React.useEffect(() => {
        async function get() {
            try {
                const response = await getAllExaminers(token);
                setExaminerSelected(response.data);
            } catch (error) {
                console.log('Error get all examiners ', error.message);
            }
        }
        get()
    }, [token]);


    // popper component variable 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        console.log(anchorEl);
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    // popper component variable 
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const handleClick2 = (event) => {
        if (anchorEl2 === null) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
        setAnchorEl2(anchorEl2 ? null : event.currentTarget);
    };
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popper' : undefined;

    // Get data
    React.useEffect(() => {
        async function get() {
            setLoading(true); // Set loading to true while fetching data
            try {
                const response = await getHeadStudyProgramProposalHaveExaminers(token, page);
                setProposals(response.data); // Adjust this according to your API response
                setTotal(response.total); // Adjust this according to your API response
                setPerPage(response.per_page); // Adjust this according to your API response
            } catch (error) {
                console.log('Error get head study program proposal have examiners', error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        }
        get();
    }, [token, page]);

    const handlePageChange = (event, value) => {
        setPage(parseInt(value, 10));
    };

    async function handleGetAllExaminers(proposalId) {
        try {
            const response = await getAllHeadStudyProgramExaminers(token, proposalId);
            setExaminers(response); // Set examiners state with response data
        } catch (error) {
            console.log('Error get all examiners', error.message);
        }
    }

    async function handleUpdateProposalExaminer(proposalId, oldExaminer) {

        let body = {
            "proposal_id": proposalId,
            "new_examiner": newExaminer,
            "old_examiner": oldExaminer
        }
        try {
            let response = await updateProposalExaminer(body, token);
            console.log(response);
        } catch (error) {
            console.log('Error update proposal examiners', error.message);
        }

        setNewExaminer(" ");
    }




    return (
        <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={0} borderRadius={2} marginLeft={0}>
            <Table size="small">
                <TableHead sx={{ background: "#EBEBEB" }}>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Nrp</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Upload Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ubah Penguji</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        proposals.map((v, i) => (
                            <TableRow key={i} >
                                <TableCell>{(page - 1) * perPage + i + 1}</TableCell>
                                <TableCell>{v.student_name}</TableCell>
                                <TableCell>{v.nrp}</TableCell>
                                <TableCell>{v.title}</TableCell>
                                <TableCell>{v.upload_date}</TableCell>
                                <TableCell>{v.head_study_program_approval_status}</TableCell>
                                <TableCell>
                                    <IconButton disabled={disabledButton} aria-describedby={id} size="small" onClick={(e) => { handleClick(e); handleGetAllExaminers(v.id); }}>
                                        <SettingsIcon fontSize="inherit" />
                                    </IconButton>
                                    <Popper id={id} open={open} anchorEl={anchorEl}>
                                        <Box sx={{ border: "0.5px solid #CFD8DC", p: 1, bgcolor: 'background.paper' }}>
                                            {examiners.map((examiner, index) => (
                                                <Typography key={index} color={"black"} fontSize={"0.7rem"}>
                                                    {examiner.name} <Typography aria-describedby={id2} onClick={handleClick2} sx={{ cursor: "pointer" }} variant='caption'> | change</Typography>
                                                    <Popper id={id2} open={open2} anchorEl={anchorEl2}>
                                                        <Box sx={{ border: "0.5px solid #CFD8DC", p: 1, bgcolor: 'background.paper' }}>
                                                            <FormControl variant="standard">
                                                                <Select
                                                                    sx={{ fontSize: "10px" }}
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    defaultValue={""}
                                                                    onChange={e => setNewExaminer(e.target.value)}
                                                                    label="pembimbing baru"
                                                                >
                                                                    {
                                                                        examinerSelected.map((v, i) => (
                                                                            <MenuItem sx={{ fontSize: "10px" }} key={i} value={v.id}>{v.name}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </FormControl>

                                                            <Button sx={{ display: "block", padding: 0, fontSize: "9px", marginTop: "3px" }} disabled={disabledButton2} onClick={() => handleUpdateProposalExaminer(v.id, examiner.examiner_id)} variant="outlined" color="error">
                                                                Simpan
                                                            </Button>
                                                        </Box>
                                                    </Popper>
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Popper>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {!loading && (
                <Box display="flex" justifyContent="center" marginY={3}>
                    <Pagination count={Math.ceil(total / perPage)} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
                </Box>
            )}
        </Grid>
    );
}

const HeadStudyProgramProposalList = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarAndDrawer title={"Daftar Proposal"} pages={headStudyProgramPages()} />
            <Feed>
                <Fill />
            </Feed>
        </Box>
    )
}

export default HeadStudyProgramProposalList;

// import * as React from 'react';
// import { Box, CircularProgress, CssBaseline, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Popper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
// import AppBarAndDrawer from "../components/AppBarAndDrawer";
// import Feed from "../components/Feed";
// import { headStudyProgramPages } from "../helpers/constants";
// import { useNavigate } from "react-router-dom";
// import { useSession } from "../contexts/SessionContext";
// import { getAllHeadStudyProgramExaminers, getHeadStudyProgramProposalHaveExaminers } from "../api/headStudyPrograms";
// import SettingsIcon from '@mui/icons-material/Settings';
// import { getAllExaminers } from '../api/examiners';

// function Fill() {
//     const { token } = useSession();
//     const [proposals, setProposals] = React.useState([]);
//     const [examiners, setExaminers] = React.useState([]);
//     const [examinerSelected, setExaminerSelected] = React.useState([]);
//     const [total, setTotal] = React.useState(0);
//     const [newExaminer, setNewExaminer] = React.useState("");
//     const [perPage, setPerPage] = React.useState(5);
//     const [page, setPage] = React.useState(1);
//     const [loading, setLoading] = React.useState(true);
//     const navigate = useNavigate();

//     React.useEffect(() => {
//         async function get() {
//             try {
//                 const response = await getAllExaminers(token);
//                 setExaminerSelected(response.data);
//             } catch (error) {
//                 console.log('Error get all examiners ', error.message);
//             }
//         }
//         get()
//     }, [token]);

//     function navigateToProposalDetail(id) {
//         navigate(`/head-study-programs/proposal/detail/${id}`);
//     }

//     // popper component variable
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [currentProposalId, setCurrentProposalId] = React.useState(null);

//     const handleClick = (event, proposalId) => {
//         setAnchorEl(event.currentTarget);
//         setCurrentProposalId(proposalId);
//         handleGetAllExaminers(proposalId);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//         setCurrentProposalId(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popper' : undefined;

//     // popper component variable for changing examiner
//     const [anchorEl2, setAnchorEl2] = React.useState(null);
//     const [currentExaminerId, setCurrentExaminerId] = React.useState(null);

//     const handleClick2 = (event, examinerId) => {
//         setAnchorEl2(event.currentTarget);
//         setCurrentExaminerId(examinerId);
//     };

//     const handleClose2 = () => {
//         setAnchorEl2(null);
//         setCurrentExaminerId(null);
//     };

//     const open2 = Boolean(anchorEl2);
//     const id2 = open2 ? 'simple-popper' : undefined;

//     // Get data
//     React.useEffect(() => {
//         async function get() {
//             setLoading(true); // Set loading to true while fetching data
//             try {
//                 const response = await getHeadStudyProgramProposalHaveExaminers(token, page);
//                 setProposals(response.data); // Adjust this according to your API response
//                 setTotal(response.total); // Adjust this according to your API response
//                 setPerPage(response.per_page); // Adjust this according to your API response
//             } catch (error) {
//                 console.log('Error get head study program proposal have examiners', error.message);
//             } finally {
//                 setLoading(false); // Set loading to false after fetching data
//             }
//         }
//         get();
//     }, [token, page]);

//     const handlePageChange = (event, value) => {
//         setPage(parseInt(value, 10));
//     };

//     async function handleGetAllExaminers(proposalId) {
//         try {
//             const response = await getAllHeadStudyProgramExaminers(token, proposalId);
//             console.log(response);
//             setExaminers(response); // Set examiners state with response data
//         } catch (error) {
//             console.log('Error get all examiners', error.message);
//         }
//     }

//     return (
//         <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={0} borderRadius={2} marginLeft={0}>
//             <Table size="small">
//                 <TableHead sx={{ background: "#EBEBEB" }}>
//                     <TableRow>
//                         <TableCell>No</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Nrp</TableCell>
//                         <TableCell>Title</TableCell>
//                         <TableCell>Upload Date</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Ubah Penguji</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {loading ? (
//                         <TableRow>
//                             <TableCell colSpan={7} align="center">
//                                 <CircularProgress />
//                             </TableCell>
//                         </TableRow>
//                     ) : (
//                         proposals.map((v, i) => (
//                             <TableRow key={i} >
//                                 <TableCell>{(page - 1) * perPage + i + 1}</TableCell>
//                                 <TableCell>{v.student_name}</TableCell>
//                                 <TableCell>{v.nrp}</TableCell>
//                                 <TableCell>{v.title}</TableCell>
//                                 <TableCell>{v.upload_date}</TableCell>
//                                 <TableCell>{v.head_study_program_approval_status}</TableCell>
//                                 <TableCell>
//                                     <IconButton aria-describedby={id} size="small" onClick={(e) => handleClick(e, v.id)}>
//                                         <SettingsIcon fontSize="inherit" />
//                                     </IconButton>
//                                     <Popper id={id} open={open} anchorEl={anchorEl}>
//                                         <Box sx={{ border: "0.5px solid #CFD8DC", p: 1, bgcolor: 'background.paper' }}>
//                                             {examiners.map((examiner, index) => (
//                                                 <Typography key={index} color={"black"} fontSize={"0.7rem"}>
//                                                     {examiner.name}
//                                                     <Typography onClick={(e) => handleClick2(e, examiner.id)} sx={{ cursor: "pointer" }} variant='caption'> | change</Typography>
//                                                 </Typography>
//                                             ))}
//                                         </Box>
//                                     </Popper>
//                                     <Popper id={id2} open={open2} anchorEl={anchorEl2}>
//                                         <Box sx={{ border: "0.5px solid #CFD8DC", p: 1, bgcolor: 'background.paper' }}>
//                                             <FormControl variant="standard" sx={{ marginBottom: 3, width: 350 }}>
//                                                 <InputLabel id="demo-simple-select-standard-label">Pembimbing baru</InputLabel>
//                                                 <Select
//                                                     labelId="demo-simple-select-standard-label"
//                                                     id="demo-simple-select-standard"
//                                                     value={newExaminer}
//                                                     onChange={e => setNewExaminer(e.target.value)}
//                                                     label="Pembimbing baru"
//                                                 >
//                                                     {examinerSelected.map((v, i) => (
//                                                         <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             </FormControl>
//                                         </Box>
//                                     </Popper>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     )}
//                 </TableBody>
//             </Table>
//             {!loading && (
//                 <Box display="flex" justifyContent="center" marginY={3}>
//                     <Pagination count={Math.ceil(total / perPage)} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
//                 </Box>
//             )}
//         </Grid>
//     );
// }

// const HeadStudyProgramProposalList = () => {
//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <AppBarAndDrawer title={"Daftar Proposal"} pages={headStudyProgramPages()} />
//             <Feed>
//                 <Fill />
//             </Feed>
//         </Box>
//     )
// }

// export default HeadStudyProgramProposalList;

