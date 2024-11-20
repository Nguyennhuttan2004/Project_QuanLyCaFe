import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/shopping-view/orders";
import Profile from "../../pages/auth/Profile";
import Slider from "@/components/shopping-view/slider";

function ShoppingAccount() {
    return (
        <>
            <div className="w-full">
                <Slider />
            </div>
            <div className="flex flex-col">
                <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                    <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                        <Tabs defaultValue="orders">
                            <TabsList  className="flex justify-center items-center bg-white">
                                <TabsTrigger value="orders">Orders</TabsTrigger>
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                            </TabsList>
                            <TabsContent value="orders">
                                <Orders />
                            </TabsContent>
                            <TabsContent value="profile">
                                <Profile />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShoppingAccount;