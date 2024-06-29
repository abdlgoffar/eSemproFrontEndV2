import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UploadIcon from "@mui/icons-material/DriveFolderUpload";
import RevisionIcon from "@mui/icons-material/AutoStories";
import UserIcon from "@mui/icons-material/SupervisedUserCircle";
import ProposalIcon from "@mui/icons-material/Drafts";
import InviteIcon from "@mui/icons-material/Send";

import PanToolIcon from '@mui/icons-material/PanTool';
export default function ListItems({ data }) {
  return (
    <React.Fragment>
      {
        data.map((v, i) => (
          <ListItemButton key={i} sx={{ margin: 1 }} component="a" href={v.link}>
            <ListItemIcon>
              {
                (v.icon === "Upload" && (
                  <UploadIcon />
                )) ||
                (v.icon === "Revision" && (
                  <RevisionIcon />
                )) ||
                (v.icon === "Invitation" && (
                  <InviteIcon />
                )) ||
                (v.icon === "User" && (
                  <UserIcon />
                )) ||
                (v.icon === "Proposal" && (
                  <ProposalIcon />
                )) ||
                (v.icon === "Attendance" && (
                  <PanToolIcon />
                ))}
            </ListItemIcon>
            <ListItemText primary={v.name} />
          </ListItemButton>
        ))
      }
    </React.Fragment>
  )
}
