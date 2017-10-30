/* begin_generated_IBM_copyright_prolog                             */
/*                                                                  */
/* **************************************************************** */
/* (C) Copyright IBM Corp.  2017                              */
/* All Rights Reserved.                                             */
/* **************************************************************** */
/* end_generated_IBM_copyright_prolog                               */
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Download from 'material-ui/lib/svg-icons/file/file-download';
import AppTheme from './style/theme';
import BaseComponent from './common/BaseComponent';
//Reusable component to show a "Download" button. Used to download the various config files needed
// Expected properties are label and uri , label and file for the button that will be displayed, and uri for the file to download.
// Used by DeviceCfg.jsx and Howto.jsx
class DownloadButton extends BaseComponent {
  constructor(props, context) {
    super(props,context);
  }

  render(){


    return(
    <div>
    <form action={this.props.uri} method="get">
     <RaisedButton
        label={this.props.label}
      type="submit"
      download={this.props.name}
        icon={<Download />}/>

      </form>

      </div>)

    }


}
export default DownloadButton;
