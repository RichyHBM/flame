import classes from './AppGrid.module.css';
import { Link } from 'react-router-dom';
import { App } from '../../../interfaces/App';

import { AppCard } from '../AppCard/AppCard';
import { Message } from '../../UI';

interface Props {
  apps: App[];
  totalApps?: number;
  searching: boolean;
}

export const AppGrid = (props: Props): JSX.Element => {
  let apps: JSX.Element;

  if (props.searching || props.apps.length) {
    if (!props.apps.length) {
      apps = <Message>No apps match your search criteria</Message>;
    } else {
      let listCategories: Array<number> = props.apps.map(app => { return app.categoryId } ).filter((value, index, self) => { return self.indexOf(value) === index; } ).sort();     
      apps = (
        <div>
          { 
            listCategories.map((category, index, array) => {
              return (
              <div>
                <div className={classes.AppGrid}>
                {
                  props.apps.filter( 
                    (value, index, self) => { return category == value.categoryId; } 
                  ).map(app => { return <AppCard key={app.id} app={app} />; })
                }
                </div>
                <div className={(index != array.length-1)?classes.AppGridDivider:""}></div>
              </div>);
            })
          }
        </div>
      );
    }
  } else {
    if (props.totalApps) {
      apps = (
        <Message>
          There are no pinned applications. You can pin them from the{' '}
          <Link to="/applications">/applications</Link> menu
        </Message>
      );
    } else {
      apps = (
        <Message>
          You don't have any applications. You can add a new one from{' '}
          <Link to="/applications">/applications</Link> menu
        </Message>
      );
    }
  }

  return apps;
};
