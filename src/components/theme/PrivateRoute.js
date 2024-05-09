"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addSnackbarData } from "@/reduxtoolkit/slices/SnakMessageSlice";

export const PrivateRoute = (WrappedComponent) => {
    return function PrivateRoute(props) {
        const dispatch = useDispatch();
        const { token } = useSelector((state) => state.LoginUser);
        useEffect(() => {
            if (!token) {
                dispatch(addSnackbarData({ message: "Please login first", variant: "error" }));
                redirect("/login");
            }
        }, [dispatch, token]);

        // if (!token) {
        //     redirect("/login");
        // }
        return <WrappedComponent {...props} />;
    };
};