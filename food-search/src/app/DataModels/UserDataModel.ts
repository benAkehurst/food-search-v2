import RouteDataModel from './RouteDataModel';
import PlaceDataModel from './PlaceDataModel';

class UserDataModel {
    _id: string;
    name: String = '';
    email: String = '';
    password: String = '';
    image: String = '';
    savedRoutes: RouteDataModel[] = [];
    savedPlaces: PlaceDataModel[] = [];
}

export default UserDataModel;
