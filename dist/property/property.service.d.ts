import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyService {
    private propertyRepository;
    constructor(propertyRepository: Repository<Property>);
    create(createPropertyDto: CreatePropertyDto): Promise<Property>;
    findAll(): Promise<Property[]>;
    findOne(id: number): Promise<Property>;
    update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Property>;
    remove(id: number): Promise<void>;
    findByCity(city: string): Promise<Property[]>;
    findByType(propertyType: string): Promise<Property[]>;
}
