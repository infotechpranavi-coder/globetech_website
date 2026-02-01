import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(createPropertyDto: CreatePropertyDto): Promise<import("./property.entity").Property>;
    findAll(city?: string, type?: string): Promise<import("./property.entity").Property[]>;
    findOne(id: string): Promise<import("./property.entity").Property>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<import("./property.entity").Property>;
    remove(id: string): Promise<void>;
}
