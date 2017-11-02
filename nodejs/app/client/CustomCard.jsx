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
import { Card, CardHeader, CardText } from 'material-ui/lib/card';



class CustomCard extends BaseComponent {


  render(){


    return (
        <Card style={{ margin: "20"}}>
          <CardHeader
          titleColor={AppTheme.cardTitleColor}
          subtitleColor={AppTheme.cardSubtitleColor}
          style={{backgroundColor:      AppTheme.palette.primary1Color}}
          titleStyle={{fontSize: "19pt"}}
          title = {this.props.title}
          subtitleStyle={{fontSize: "12pt"}}
          subtitle ={this.props.subtitle}

          />
          <CardText style={{textAlign: this.props.align, fontSize: "13pt"}}>
          {this.props.children}
          </CardText>
          </Card>

      )

    }


}
export default CustomCard;
